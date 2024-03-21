import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import SocialRepository from "@source/repositories/SocialRepository";
import TenantConnection from "@app/db/TenantConnection";
import {ISocial} from "@app/interfaces/SourceInterfaces";

export default class SocialService extends Service {
    private mainRepo = new SocialRepository();

    async getSocials(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findSocial(socialId: number, params: IParams) {
        return await this.mainRepo.findById(socialId, params)
    }

    async createSocial(data: ISocial): Promise<ISocial> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateSocial(socialId: number, data: ISocial): Promise<ISocial> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteSocial(socialId: number): Promise<ISocial> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreSocial(socialId: number): Promise<ISocial> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}