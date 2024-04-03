import Service from "@app/services/Service";
import {AuthRepository} from "@auth/repositories/AuthRepository";
import {IParams} from "@app/interfaces/AppInterfaces";
import BaseConnection from "@app/db/BaseConnection";
import {IAuth} from "@auth/utils/AuthInterfaces";
import AuthMailService from "@auth/services/AuthMailService";
import AuthService from "@auth/services/AuthService";
import UserViewRepository from "@source/repositories/UserViewRepository";
import RoleMiddleware from "@auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class UserService extends Service {
    private mainRepo = new AuthRepository();
    private authMailService: AuthMailService = new AuthMailService();
    private  userViewRepo=new UserViewRepository();
    async getUsers(params: IParams) {
        return await this.userViewRepo.getAll(params)
    }

    async getAuthUsers(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findUser(userId: string, params: IParams) {
        return await this.userViewRepo.findById(userId, params)
    }

    async createUser(data: IAuth): Promise<IAuth> {
        const trans = await BaseConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateUser(userId: string, data: IAuth): Promise<IAuth> {
        const trans = await BaseConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
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
            },
            async () => await trans.rollback()
        )
    }

    async restoreUser(userId: string): Promise<IAuth> {
        const trans = await BaseConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}