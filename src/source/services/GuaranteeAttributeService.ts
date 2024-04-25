import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import GuaranteeAttributeRepository from "@source/repositories/GuaranteeAttributeRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IGuaranteeAttribute} from "@app/interfaces/SourceInterfaces";

export default class GuaranteeAttributeService extends Service {
    private mainRepo = new GuaranteeAttributeRepository();

    async getGuaranteeAttributes(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findGuaranteeAttribute(guaranteeAttributeId: string, params: IParams) {
        return await this.mainRepo.findById(guaranteeAttributeId, params)
    }

    async createGuaranteeAttribute(data: IGuaranteeAttribute): Promise<IGuaranteeAttribute> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateGuaranteeAttribute(guaranteeAttributeId: string, data: IGuaranteeAttribute): Promise<IGuaranteeAttribute> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteGuaranteeAttribute(guaranteeAttributeId: string): Promise<IGuaranteeAttribute> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreGuaranteeAttribute(guaranteeAttributeId: string): Promise<IGuaranteeAttribute> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}