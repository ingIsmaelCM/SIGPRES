import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import LawyerRepository from "@source/repositories/LawyerRepository";
import TenantConnection from "@app/db/TenantConnection";
import {ILawyer} from "@app/interfaces/SourceInterfaces";

export default class LawyerService extends Service {
    private mainRepo = new LawyerRepository();

    async getLawyers(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findLawyer(lawyerId: number, params: IParams) {
        return await this.mainRepo.findById(lawyerId, params)
    }

    async createLawyer(data: ILawyer): Promise<ILawyer> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateLawyer(lawyerId: number, data: ILawyer): Promise<ILawyer> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteLawyer(lawyerId: number): Promise<ILawyer> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreLawyer(lawyerId: number): Promise<ILawyer> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}