import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import SocialRepository from "@source/repositories/SocialRepository";
import TenantConnection from "@app/db/TenantConnection";
import {ISocial} from "@app/interfaces/SourceInterfaces";
import {Client} from "@source/models";

export default class SocialService extends Service {
    private mainRepo = new SocialRepository();

    async getSocials(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findSocial(socialId: string, params: IParams) {
        return await this.mainRepo.findById(socialId, params)
    }

    async createSocial(data: ISocial): Promise<ISocial> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            await  this.mainRepo.validateBeforeInsertRelation(Client, data.clientId);
            const newSocial=await this.mainRepo.updateOrCreate(data, trans);
            await trans.commit();
            return newSocial;
            },
            async () => await trans.rollback()
        )
    }




}