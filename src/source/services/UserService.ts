import Service from "@app/services/Service";
import {AuthRepository} from "@auth/repositories/AuthRepository";
import {IParams} from "@app/interfaces/AppInterfaces";
import BaseConnection from "@app/db/BaseConnection";
import {IAuth} from "@app/interfaces/AuthInterfaces";
import AuthMailService from "@auth/services/AuthMailService";
import AuthService from "@auth/services/AuthService";
import UserViewRepository from "@source/repositories/UserViewRepository";
import RoleMiddleware from "@auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";
import InfoService from "@source/services/InfoService";
import TenantConnection from "@app/db/TenantConnection";
import TenantRepository from "@auth/repositories/TenantRepository";
import tenant from "@auth/models/Tenant";
import tenantRequest from "@auth/requests/TenantRequest";
import bcrypt from "bcrypt";

export default class UserService extends Service {
    private mainRepo = new AuthRepository();
    private authMailService: AuthMailService = new AuthMailService();
    private userViewRepo = new UserViewRepository();
    private infoService = new InfoService();
    private tenantRepo = new TenantRepository();

    async getUsers(params: IParams, req: any) {
        return this.safeRun(async () => {
            //We retrieve users from tenant, cause we couldn't make cross relationship between auths and info
            const tenant = await this.tenantRepo.find('key', req.cookies.tenant, false,
                {include: 'auths.roles.permissions,auths.permissions'});
            return await (tenant).auths
        })
    }

    async getAuthUsers(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findUser(userId: string, params: IParams) {
        return await this.userViewRepo.findById(userId, params)
    }

    async createUser(data: IAuth): Promise<IAuth> {
        const trans = await BaseConnection.getTrans();
        const infoTrans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                data.password = await bcrypt.hash(data.password, 10);
                const newUser = await this.mainRepo.create({...data}, trans);
                const newInfo = await this.infoService.setFromRelated({...data, id: newUser.id} as any, infoTrans);
                await this.mainRepo.update({infoId: newInfo.id}, newUser.id, trans);
                await trans.commit();
                await infoTrans.commit();
                return {...newUser.dataValues, info: newInfo};
            },
            async () => {
                await trans.rollback();
                await infoTrans.rollback();
            }
        )
    }

    async updateUser(data: IAuth): Promise<IAuth> {
        const infoTrans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const updatedInfo = await this.infoService.setFromRelated(data as any, infoTrans);
                await infoTrans.commit();
                return updatedInfo;
            },
            async () => await infoTrans.rollback()
        )
    }

    public async sendVerificationCode(userEmail: string): Promise<any> {
        const trans = await BaseConnection.getTrans();
        return this.safeRun(async () => {
                const context = await new AuthService()
                    .getContextForSendCodeToEmail(userEmail);
                await this.authMailService.sendEmail({
                    to: userEmail,
                    context,
                    subject: "Active su cuenta",
                    template: "verifyAccount"
                });
                const auth = await this.mainRepo.find("email", userEmail);
                await this.mainRepo.update({verifiedAt: "unverified"}, auth.id, trans);
                await trans.commit();
                return "Código enviado exitosamente";
            },
            async () => await trans.rollback()
        )
    }

    async deleteUser(userId: string): Promise<IAuth> {
        const trans = await BaseConnection.getTrans();
        return this.safeRun(async () => {
                const deletedUser = await this.mainRepo.delete(userId, trans);
                await trans.commit();
                return deletedUser;
            },
            async () => await trans.rollback()
        )
    }

    async restoreUser(userId: string): Promise<IAuth> {
        const trans = await BaseConnection.getTrans();
        return this.safeRun(async () => {
                const restoredUser = await this.mainRepo.restore(userId, trans);
                await trans.commit();
                return restoredUser;
            },
            async () => await trans.rollback()
        )
    }


}