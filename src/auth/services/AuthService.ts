import Auth from "../models/Auth";
import {AuthRepository} from "../repositories/AuthRepository";
import bcrypt from "bcrypt";
import AuthMailService from "@auth/services/AuthMailService";
import config from "@app/app.config";
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from "uuid";
import {Request, Response} from "express";
import tools from "@app/utils/tools";
import BaseConnection from "@app/db/BaseConnection";
import {IAuth} from "@app/interfaces/AuthInterfaces";
import Service from "@app/services/Service";
import TenantConnection from "@app/db/TenantConnection";
import InfoService from "@source/services/InfoService";
import appConfig from "@app/app.config";
 import {version} from "../../../package.json"

export default class AuthService extends Service {
    private authRepo: AuthRepository = new AuthRepository();
    private authMailService: AuthMailService = new AuthMailService();


    async createAuth(auth: IAuth): Promise<Auth> {
        const trans: any = await BaseConnection.getTrans();
        try {
            const emailExists: any = await this.authRepo.find("email", auth.email!);
            const usernameExists: any = await this.authRepo.find(
                "username",
                auth.username
            );
            if (emailExists || usernameExists) {
                await Promise.reject({
                    code: 422,
                    message: "The provided email or username is already in use.",
                })
            }
            const hashedPWD = await bcrypt.hash(auth.password, 10);
            const newAuth: Auth = await this.authRepo.create(
                {
                    ...auth,
                    password: hashedPWD,
                },
                trans
            );

            await trans.commit();
            return newAuth;
        } catch (error: any) {
            await trans.rollback();
            throw {code: error.code, message: error.message};
        }
    }

    async updateAuthInfo(infoId: string, info: any) {
        const trans = await TenantConnection.getTrans();
        const authTrans = await BaseConnection.getTrans();
        return this.safeRun(async () => {
            const updatedInfo = await new InfoService().setFromRelated({...info, id: infoId}, trans);
            await this.authRepo.update({infoId: infoId}, infoId, authTrans);
            await trans.commit();
            await authTrans.commit();
            return updatedInfo
        }, async () => {
            await trans.rollback();
            await authTrans.rollback();

        })
    }


    async login(auth: any, res: Response, req?: Request) {
        const trans = await BaseConnection.getTrans();
        try {
            let userAuth = await this.authRepo.find(
                config.auth.loginField,
                auth[config.auth.loginField],
                false,
                {include: "roles.permissions,permissions,tenants"}
            );
            if (
                userAuth &&
                (await this.validateAuthAccount(userAuth, auth.password))
            ) {
                if (!userAuth.tenants || userAuth.tenants.length == 0) {
                    await Promise.reject({
                        code: 401,
                        message: "El usuario no tiene una base de datos asociada",
                    });
                }
                const updateData = {lastlogin: new Date(), status: 1};
                await this.authRepo.update(updateData, userAuth.id, trans);
                const {token, refreshToken} = this.generateTokens(userAuth);
                this.setLoginCookies(res, refreshToken, token, userAuth, req);
                await trans.commit();
                const prevTenant=userAuth.tenants.find((tenant: any)=>tenant.key===req?.cookies?.tenant)
                userAuth.tenants=userAuth.tenants.filter((tenant: any)=>tenant.key!==prevTenant?.key);
                if(prevTenant){
                    userAuth.tenants.unshift(prevTenant)
                }
                const result = {
                    ...userAuth.dataValues,
                    tenants: userAuth.tenants,
                    password: null,
                    fullname: userAuth.fullname,
                    permissions: userAuth.allPermissions,
                    roles: userAuth.roles?.map((role: any) =>
                        ({id: role.id, name: role.name})),
                };
                result.version = version;
                return {userAuth: result, token};
            }
            await Promise.reject({
                code: 401,
                message: "Credenciales incorrectas",
            });
        } catch (error: any) {
            await trans.rollback();
            throw {code: error.code, message: error.message};
        }
    }

    async verifyAuth(data: any) {
        const trans = await BaseConnection.getTrans();
        try {
            const {email, code} = data;
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
            if (!await bcrypt.compare(code, auth.sessionId)) {
                return Promise.reject({
                    code: 419,
                    message: "El código ingresado no es correcto",
                });
            }
            await this.authRepo.update({verifiedAt: new Date()}, auth.id, trans);
            await trans.commit();
        } catch (error: any) {
            await trans.rollback();
            throw {code: error.code, message: error.message};
        }
    }

    public generateTokens(userAuth: any) {
        const token = tools.getToken(
            {...userAuth.dataValues, roles: undefined, permissions: undefined},
            config.auth.expiresIn
        );
        const refreshToken = tools.getToken(
            {email: userAuth.email},
            "7d"
        );
        return {token, refreshToken};
    }

    public async logout(res: Response) {
        tools.setCookie(res, "accessToken", "null");
    }

    async unAuthorizeUser(userId: string): Promise<IAuth> {
        const trans = await BaseConnection.getTrans();
        return this.safeRun(async () => {
                const unauthorized = await this.authRepo.update({verifiedAt: null}, userId, trans);
                await trans.commit();
                return unauthorized;
            },
            async () => await trans.rollback()
        )
    }


    public async logoutAll(req: any, res: Response) {
        const trans = await BaseConnection.getTrans();
        try {
            await this.authRepo.update(
                {
                    sessionId: uuidv4(),
                },
                req.auth.id,
                trans
            );

            tools.setCookie(res, "accessToken", "null");

            await trans.commit();
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: 500,
                message: error.message,
            };
        }
    }

    public async resetPassword(
        authId: string,
        newPassword: string
    ): Promise<any> {
        const trans = await BaseConnection.getTrans();
        try {
            const hashedPWD = await bcrypt.hash(newPassword, 10);
            const updatedAuth = await this.authRepo.update(
                {
                    password: hashedPWD,
                },
                authId,
                trans
            );
            await trans.commit();
            return updatedAuth;
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: 500,
                message: error.message,
            };
        }
    }

    public async sendRecoverLink(authEmail: string): Promise<any> {
        try {
            const context = await this.getContextForSendCodeToEmail(authEmail);
            await this.authMailService.sendEmail({
                to: authEmail,
                context,
                subject: "Recupere su Contraseña",
                template: "recoverPassword"
            });
            return "Código enviado exitosamente";
        } catch (error: any) {
            throw {
                code: error.code || 500,
                message: error.message,
            };
        }
    }

    public async sendVerificationCode(authEmail: string): Promise<any> {
        try {
            const context = await this.getContextForSendCodeToEmail(authEmail);
            await this.authMailService.sendEmail({
                to: authEmail,
                context,
                subject: "Verifique su cuenta",
                template: "verifyAccount"
            });
            return "Código enviado exitosamente";
        } catch (error: any) {
            throw {
                code: error.code || 500,
                message: error.message,
            };
        }
    }

    public async getContextForSendCodeToEmail(authEmail: string) {
        const numbers = []
        for (let i = 0; i < 2; i++) {
            const num = Math.floor(Math.random() * 999)
            numbers.push(String(num).padStart(3, "0"))
        }
        const auth = await this.authRepo.find("email", authEmail);
        if (!auth) {
            return Promise.reject({
                code: 404,
                message: "No se encontró el usuario"
            })
        }
        const newSessionId = await bcrypt.hash(numbers.join(""), 10)
        await auth.update({sessionId: newSessionId})
        return {
            email: authEmail,
            firstPart: numbers[0],
            secondPart: numbers[1],
        };
    }

    async recoverPassword(data: any, res: Response): Promise<any> {
        return this.safeRun(async () => {
            const auth = await this.authRepo.find("email", data.email);
            if (!await bcrypt.compare(data.code, auth.sessionId)) {
                return Promise.reject({
                    code: 422,
                    message: "El código ingresado no es válido"
                })
            }
            await auth.update({sessionId: null})
            const password = this.generatePassword();
            await this.resetPassword(auth.id, password);
            return this.login({username: auth.username, password: password}, res);
        })
    }

    public async refreshToken(req: any, res: Response): Promise<any> {
        try {
            const freshToken = tools.getCookies(req)?.refreshToken || "none";
            const decoded: any = await new Promise((resolve: Function, reject: Function) => {
                jwt.verify(
                    freshToken,
                    config.auth.secret,
                    (err: any, decoded: any) => {
                        if (err) {
                            reject({
                                code: 401,
                                message: "Refresh token expirado o inválido",
                            })
                        }
                        resolve(decoded);
                    }
                )
            });
            let userAuth = await this.authRepo.find("email", decoded.email, false,);
            const {token, refreshToken} = this.generateTokens(userAuth);
            tools.setCookie(res, "refreshToken", `${refreshToken}`);
            tools.setCookie(res, "accessToken", `Bearer ${token}`);
            return {userAuth, token};
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    private setLoginCookies(
        res: Response,
        refreshToken: String,
        token: String,
        userAuth: any,
        req?: Request
    ) {
        tools.setCookie(res, "refreshToken", `${refreshToken}`);
        tools.setCookie(res, "accessToken", `Bearer ${token}`);
        const tenant =  req?.cookies?.tenant|| userAuth.tenants
            .sort((a: any,b: any)=>a.key.localeCompare(b.key))[0].key;
        tools.setCookie(res, "tenant",tenant);
    }


    private async validateAuthAccount(auth: any, pwd: string): Promise<Boolean> {
        const isValidPassword = await bcrypt.compare(
            pwd,
            auth["_previousDataValues"].password
        );
        const isAccountVerified = auth.verifiedAt != null;
        if (!isAccountVerified)
            throw {code: 401, message: "Cuenta no verificada"};
        return isValidPassword;
    }

    private generatePassword() {
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
