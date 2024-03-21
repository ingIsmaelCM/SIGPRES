import Service from "@app/services/Service";
import  {IParams} from "@app/interfaces/AppInterfaces";
import AmortizationRepository from "@source/repositories/AmortizationRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IAmortization} from "@app/interfaces/SourceInterfaces";

export default class AmortizationService extends Service {
    private mainRepo = new AmortizationRepository();

    async getAmortizations(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findAmortization(amortizationId: number, params: IParams) {
        return await this.mainRepo.findById(amortizationId, params)
    }

    async createAmortization(data: IAmortization): Promise<IAmortization> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateAmortization(amortizationId: number, data: IAmortization): Promise<IAmortization> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteAmortization(amortizationId: number): Promise<IAmortization> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreAmortization(amortizationId: number): Promise<IAmortization> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}