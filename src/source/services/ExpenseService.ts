import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ExpenseRepository from "@source/repositories/ExpenseRepository";
import TenantConnection from "@app/db/TenantConnection";
import {IExpense} from "@app/interfaces/SourceInterfaces";

export default class ExpenseService extends Service {
    private mainRepo = new ExpenseRepository();

    async getExpenses(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findExpense(expenseId: string, params: IParams) {
        return await this.mainRepo.findById(expenseId, params)
    }

    async createExpense(data: IExpense): Promise<IExpense> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async updateExpense(expenseId: string, data: IExpense): Promise<IExpense> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deleteExpense(expenseId: string): Promise<IExpense> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreExpense(expenseId: string): Promise<IExpense> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}