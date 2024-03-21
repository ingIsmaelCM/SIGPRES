import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ConditionRepository from "@source/repositories/ConditionRepository";
import TenantConnection from "@app/db/TenantConnection";
import {ICondition} from "@app/interfaces/SourceInterfaces";

export default class ConditionService extends Service {
    private mainRepo = new ConditionRepository();

    async getConditions(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findCondition(conditionId: number, params: IParams) {
        return await this.mainRepo.findById(conditionId, params)
    }

    async createCondition(data: ICondition): Promise<ICondition> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateCondition(conditionId: number, data: ICondition): Promise<ICondition> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteCondition(conditionId: number): Promise<ICondition> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreCondition(conditionId: number): Promise<ICondition> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}