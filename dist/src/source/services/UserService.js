"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const AuthRepository_1 = require("@auth/repositories/AuthRepository");
const BaseConnection_1 = __importDefault(require("@app/db/BaseConnection"));
const AuthMailService_1 = __importDefault(require("@auth/services/AuthMailService"));
const AuthService_1 = __importDefault(require("@auth/services/AuthService"));
const UserViewRepository_1 = __importDefault(require("@source/repositories/UserViewRepository"));
const InfoService_1 = __importDefault(require("@source/services/InfoService"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const TenantRepository_1 = __importDefault(require("@auth/repositories/TenantRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService extends Service_1.default {
    mainRepo = new AuthRepository_1.AuthRepository();
    authMailService = new AuthMailService_1.default();
    userViewRepo = new UserViewRepository_1.default();
    infoService = new InfoService_1.default();
    tenantRepo = new TenantRepository_1.default();
    async getUsers(params, req) {
        return this.safeRun(async () => {
            const tenant = await this.tenantRepo.find('key', req.cookies.tenant, false, { include: 'auths.roles.permissions,auths.permissions' });
            return await (tenant).auths;
        });
    }
    async getAuthUsers(params) {
        return await this.mainRepo.getAll(params);
    }
    async findUser(userId, params) {
        return await this.userViewRepo.findById(userId, params);
    }
    async createUser(data) {
        const trans = await BaseConnection_1.default.getTrans();
        const infoTrans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            data.password = await bcrypt_1.default.hash(data.password, 10);
            const newUser = await this.mainRepo.create({ ...data }, trans);
            const newInfo = await this.infoService.setFromRelated({ ...data, id: newUser.id }, infoTrans, 'User');
            await this.mainRepo.update({ infoId: newInfo.id }, newUser.id, trans);
            await trans.commit();
            await infoTrans.commit();
            return { ...newUser.dataValues, info: newInfo };
        }, async () => {
            await trans.rollback();
            await infoTrans.rollback();
        });
    }
    async updateUser(data) {
        const infoTrans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const updatedInfo = await this.infoService.setFromRelated(data, infoTrans, 'User');
            await infoTrans.commit();
            return updatedInfo;
        }, async () => await infoTrans.rollback());
    }
    async sendVerificationCode(userEmail) {
        const trans = await BaseConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const context = await new AuthService_1.default()
                .getContextForSendCodeToEmail(userEmail);
            await this.authMailService.sendEmail({
                to: userEmail,
                context,
                subject: "Active su cuenta",
                template: "verifyAccount"
            });
            const auth = await this.mainRepo.find("email", userEmail);
            await this.mainRepo.update({ verifiedAt: "unverified" }, auth.id, trans);
            await trans.commit();
            return "Código enviado exitosamente";
        }, async () => await trans.rollback());
    }
    async deleteUser(userId) {
        const trans = await BaseConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const deletedUser = await this.mainRepo.delete(userId, trans);
            await trans.commit();
            return deletedUser;
        }, async () => await trans.rollback());
    }
    async restoreUser(userId) {
        const trans = await BaseConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const restoredUser = await this.mainRepo.restore(userId, trans);
            await trans.commit();
            return restoredUser;
        }, async () => await trans.rollback());
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map