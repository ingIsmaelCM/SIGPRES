"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthRepository_1 = require("../repositories/AuthRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthMailService_1 = __importDefault(require("@auth/services/AuthMailService"));
const app_config_1 = __importDefault(require("@app/app.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const tools_1 = __importDefault(require("@app/utils/tools"));
const BaseConnection_1 = __importDefault(require("@app/db/BaseConnection"));
const Service_1 = __importDefault(require("@app/services/Service"));
const InfoRepository_1 = __importDefault(require("@source/repositories/InfoRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const InfoService_1 = __importDefault(require("@source/services/InfoService"));
class AuthService extends Service_1.default {
    authRepo = new AuthRepository_1.AuthRepository();
    authMailService = new AuthMailService_1.default();
    infoRepo = new InfoRepository_1.default();
    async createAuth(auth) {
        const trans = await BaseConnection_1.default.getTrans();
        try {
            const emailExists = await this.authRepo.find("email", auth.email);
            const usernameExists = await this.authRepo.find("username", auth.username);
            if (emailExists || usernameExists) {
                await Promise.reject({
                    code: 422,
                    message: "The provided email or username is already in use.",
                });
            }
            const hashedPWD = await bcrypt_1.default.hash(auth.password, 10);
            const newAuth = await this.authRepo.create({
                ...auth,
                password: hashedPWD,
            }, trans);
            await trans.commit();
            return newAuth;
        }
        catch (error) {
            await trans.rollback();
            throw { code: error.code, message: error.message };
        }
    }
    async updateAuthInfo(infoId, info) {
        const trans = await TenantConnection_1.default.getTrans();
        const authTrans = await BaseConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const updatedInfo = await new InfoService_1.default().setFromRelated({ ...info, id: infoId }, trans);
            await this.authRepo.update({ infoId: infoId }, infoId, authTrans);
            await trans.commit();
            await authTrans.commit();
            return updatedInfo;
        }, async () => {
            await trans.rollback();
            await authTrans.rollback();
        });
    }
    async login(auth, res) {
        const trans = await BaseConnection_1.default.getTrans();
        try {
            let userAuth = await this.authRepo.find(app_config_1.default.auth.loginField, auth[app_config_1.default.auth.loginField], false, { include: "roles.permissions,permissions,tenants" });
            if (userAuth &&
                (await this.validateAuthAccount(userAuth, auth.password))) {
                if (!userAuth.tenants || userAuth.tenants.length == 0) {
                    await Promise.reject({
                        code: 401,
                        message: "El usuario no tiene una base de datos asociada",
                    });
                }
                const updateData = { lastlogin: new Date(), status: 1 };
                await this.authRepo.update(updateData, userAuth.id, trans);
                const { token, refreshToken } = this.generateTokens(userAuth);
                this.setLoginCookies(res, refreshToken, token, userAuth);
                await trans.commit();
                const result = {
                    ...userAuth.dataValues,
                    password: null,
                    fullname: userAuth.fullname,
                    permissions: userAuth.allPermissions,
                    roles: userAuth.roles?.map((role) => ({ id: role.id, name: role.name })),
                };
                return { userAuth: result, token };
            }
            await Promise.reject({
                code: 401,
                message: "Invalid credentials",
            });
        }
        catch (error) {
            await trans.rollback();
            throw { code: error.code, message: error.message };
        }
    }
    async verifyAuth(data) {
        const trans = await BaseConnection_1.default.getTrans();
        try {
            const { email, code } = data;
            const auth = await this.authRepo.find("email", email);
            if (!auth) {
                return Promise.reject({
                    code: 404,
                    message: "No existe este usuario",
                });
            }
            if (auth.verifiedAt) {
                return Promise.reject({
                    code: 419,
                    message: "Esta cuenta ya está verificada",
                });
            }
            if (!await bcrypt_1.default.compare(code, auth.sessionId)) {
                return Promise.reject({
                    code: 419,
                    message: "El código ingresado no es correcto",
                });
            }
            await this.authRepo.update({ verifiedAt: new Date() }, auth.id, trans);
            await trans.commit();
        }
        catch (error) {
            await trans.rollback();
            throw { code: error.code, message: error.message };
        }
    }
    generateTokens(userAuth) {
        const token = tools_1.default.getToken({ ...userAuth.dataValues, roles: undefined, permissions: undefined }, app_config_1.default.auth.expiresIn);
        const refreshToken = tools_1.default.getToken({ email: userAuth.email }, "7d");
        return { token, refreshToken };
    }
    async logout(res) {
        tools_1.default.setCookie(res, "accessToken", "null");
    }
    async unAuthorizeUser(userId) {
        const trans = await BaseConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const unauthorized = await this.authRepo.update({ verifiedAt: null }, userId, trans);
            await trans.commit();
            return unauthorized;
        }, async () => await trans.rollback());
    }
    async logoutAll(req, res) {
        const trans = await BaseConnection_1.default.getTrans();
        try {
            await this.authRepo.update({
                sessionId: (0, uuid_1.v4)(),
            }, req.auth.id, trans);
            tools_1.default.setCookie(res, "accessToken", "null");
            await trans.commit();
        }
        catch (error) {
            await trans.rollback();
            throw {
                code: 500,
                message: error.message,
            };
        }
    }
    async resetPassword(authId, newPassword) {
        const trans = await BaseConnection_1.default.getTrans();
        try {
            const hashedPWD = await bcrypt_1.default.hash(newPassword, 10);
            const updatedAuth = await this.authRepo.update({
                password: hashedPWD,
            }, authId, trans);
            await trans.commit();
            return updatedAuth;
        }
        catch (error) {
            await trans.rollback();
            throw {
                code: 500,
                message: error.message,
            };
        }
    }
    async sendRecoverLink(authEmail) {
        try {
            const context = await this.getContextForSendCodeToEmail(authEmail);
            await this.authMailService.sendEmail({
                to: authEmail,
                context,
                subject: "Recupere su Contraseña",
                template: "recoverPassword"
            });
            return "Código enviado exitosamente";
        }
        catch (error) {
            throw {
                code: error.code || 500,
                message: error.message,
            };
        }
    }
    async sendVerificationCode(authEmail) {
        try {
            const context = await this.getContextForSendCodeToEmail(authEmail);
            await this.authMailService.sendEmail({
                to: authEmail,
                context,
                subject: "Verifique su cuenta",
                template: "verifyAccount"
            });
            return "Código enviado exitosamente";
        }
        catch (error) {
            throw {
                code: error.code || 500,
                message: error.message,
            };
        }
    }
    async getContextForSendCodeToEmail(authEmail) {
        const numbers = [];
        for (let i = 0; i < 2; i++) {
            const num = Math.floor(Math.random() * 999);
            numbers.push(String(num).padStart(3, "0"));
        }
        const auth = await this.authRepo.find("email", authEmail);
        if (!auth) {
            return Promise.reject({
                code: 404,
                message: "No se encontró el usuario"
            });
        }
        const newSessionId = await bcrypt_1.default.hash(numbers.join(""), 10);
        await auth.update({ sessionId: newSessionId });
        return {
            email: authEmail,
            firstPart: numbers[0],
            secondPart: numbers[1],
        };
    }
    async recoverPassword(data, res) {
        return this.safeRun(async () => {
            const auth = await this.authRepo.find("email", data.email);
            if (!await bcrypt_1.default.compare(data.code, auth.sessionId)) {
                return Promise.reject({
                    code: 422,
                    message: "El código ingresado no es válido"
                });
            }
            await auth.update({ sessionId: null });
            const password = this.generatePassword();
            await this.resetPassword(auth.id, password);
            return this.login({ username: auth.username, password: password }, res);
        });
    }
    async refreshToken(req, res) {
        try {
            const freshToken = tools_1.default.getCookies(req)?.refreshToken || "none";
            const decoded = await new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(freshToken, app_config_1.default.auth.secret, (err, decoded) => {
                    if (err) {
                        reject({
                            code: 401,
                            message: "Refresh token expirado o inválido",
                        });
                    }
                    resolve(decoded);
                });
            });
            let userAuth = await this.authRepo.find("email", decoded.email, false);
            const { token, refreshToken } = this.generateTokens(userAuth);
            tools_1.default.setCookie(res, "refreshToken", `${refreshToken}`);
            tools_1.default.setCookie(res, "accessToken", `Bearer ${token}`);
            return { userAuth, token };
        }
        catch (error) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    setLoginCookies(res, refreshToken, token, userAuth) {
        tools_1.default.setCookie(res, "refreshToken", `${refreshToken}`);
        tools_1.default.setCookie(res, "accessToken", `Bearer ${token}`);
        tools_1.default.setCookie(res, "tenant", userAuth.tenants[0].key);
    }
    async validateAuthAccount(auth, pwd) {
        const isValidPassword = await bcrypt_1.default.compare(pwd, auth["_previousDataValues"].password);
        const isAccountVerified = auth.verifiedAt != null;
        if (!isAccountVerified)
            throw { code: 401, message: "Cuenta no verificada" };
        return isValidPassword;
    }
    generatePassword() {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz@#$&()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 16;
        let password = "";
        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        return password;
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map