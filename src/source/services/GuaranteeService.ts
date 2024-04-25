import Service from "@app/services/Service";
import GuaranteeRepository from "@source/repositories/GuaranteeRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IParams} from "@app/interfaces/AppInterfaces";
import {IGuarantee} from "@app/interfaces/SourceInterfaces";

export default class GuaranteeService extends Service {
    private mainRepo = new GuaranteeRepository();

    async getGuarantees(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findGuarantee(guaranteeId: string, params: IParams) {
        return await this.mainRepo.findById(guaranteeId, params)
    }

    async createGuarantee(data: IGuarantee): Promise<IGuarantee> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            const newGuarantee=await  this.mainRepo.create(data, trans);
           await  trans.commit();
            return newGuarantee;
            },
            async () => await trans.rollback()
        )
    }

    async updateGuarantee(guaranteeId: string, data: IGuarantee): Promise<IGuarantee> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteGuarantee(guaranteeId: string): Promise<IGuarantee> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreGuarantee(guaranteeId: string): Promise<IGuarantee> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}