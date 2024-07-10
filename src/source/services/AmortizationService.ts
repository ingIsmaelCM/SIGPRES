import Service from "@app/services/Service";
import  {IParams} from "@app/interfaces/AppInterfaces";
import AmortizationRepository from "@source/repositories/AmortizationRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IAmortization} from "@app/interfaces/SourceInterfaces";
import AmortizationViewRepository from "@source/repositories/AmortizationViewRepository";

export default class AmortizationService extends Service {
    private mainRepo = new AmortizationRepository();
    private amortizationViewRepo=new AmortizationViewRepository();

    async getAmortizations(params: IParams) {
        return await this.amortizationViewRepo.getAll(params)
    }

    async findAmortization(amortizationId: string, params: IParams) {
        return await this.amortizationViewRepo.findById(amortizationId, params)
    }

    async createAmortization(data: IAmortization): Promise<IAmortization> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateAmortization(amortizationId: string, data: IAmortization): Promise<IAmortization> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteAmortization(amortizationId: string): Promise<IAmortization> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreAmortization(amortizationId: string): Promise<IAmortization> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}