import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import AttributeRepository from "@source/repositories/AttributeRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IAttribute} from "@app/interfaces/SourceInterfaces";

export default class AttributeService extends Service {
    private mainRepo = new AttributeRepository();

    async getAttributes(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findAttribute(guaranteeAttributeId: string, params: IParams) {
        return await this.mainRepo.findById(guaranteeAttributeId, params)
    }

    async createAttribute(data: IAttribute): Promise<IAttribute> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            const newAttribute=await  this.mainRepo.updateOrCreate(data, trans);
            await  trans.commit();
            return newAttribute;
            },
            async () => await trans.rollback()
        )
    }

    async updateAttribute(guaranteeAttributeId: string, data: IAttribute): Promise<IAttribute> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteAttribute(guaranteeAttributeId: string): Promise<IAttribute> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreAttribute(guaranteeAttributeId: string): Promise<IAttribute> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}