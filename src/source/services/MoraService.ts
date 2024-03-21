import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import MoraRepository from "@source/repositories/MoraRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IMora} from "@app/interfaces/SourceInterfaces";

export default class MoraService extends Service {
    private mainRepo = new MoraRepository();

    async getMoras(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findMora(moraId: number, params: IParams) {
        return await this.mainRepo.findById(moraId, params)
    }

    async createMora(data: IMora): Promise<IMora> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateMora(moraId: number, data: IMora): Promise<IMora> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteMora(moraId: number): Promise<IMora> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreMora(moraId: number): Promise<IMora> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}