import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import ExpenseRepository from "@source/repositories/ExpenseRepository";
import TenantConnection from "@app/db/TenantConnection";
import {ELawyerPaymentStatus, IExpense} from "@app/interfaces/SourceInterfaces";
import WalletRepository from "@source/repositories/WalletRepository";
import {Op, Transaction} from "sequelize";
import LawyerPaymentRepository from "@source/repositories/LawyerPaymentRepository";

export default class ExpenseService extends Service {
    private mainRepo = new ExpenseRepository();
    private walletRepo = new WalletRepository();
    private lawyerPaymentRepo = new LawyerPaymentRepository();

    async getExpenses(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findExpense(expenseId: string, params: IParams) {
        return await this.mainRepo.findById(expenseId, params)
    }

    async createExpense(data: IExpense, externTrans?: Transaction): Promise<IExpense> {
        const trans = externTrans || await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const newExpense = await this.mainRepo.create(data, trans);
                await this.walletRepo.setBalance((0 - data.amount), data.walletId, trans);
                if (!externTrans) {
                    await trans.commit();
                }
                return newExpense;
            },
            async () => {
                if (!externTrans) {
                    await trans.rollback()
                }
            }
        )
    }

    async createExpenseFromLawyer(data: Record<string, any>): Promise<IExpense> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                await this.lawyerPaymentRepo.bulkUpdate(
                    {
                        walletId: data.walletId,
                        status: ELawyerPaymentStatus.Pagado,
                        closedAt: data.date,
                        updatedBy: data.updatedBy
                    }, {
                        where: {
                            id: {
                                [Op.in]: data.lawyerPaymentIds
                            }
                        }
                    }, trans);
                const newExpense = await this.mainRepo.create(data, trans);
                await this.walletRepo.setBalance((0 - data.amount), data.walletId, trans);
                await trans.commit();
                return newExpense;

            },
            async () => await trans.rollback()
        )
    }

    async updateExpense(expenseId: string, data: IExpense): Promise<IExpense> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const prevExpense = await this.mainRepo.findById(expenseId);
                const updatedExpense = await this.mainRepo.update(data, expenseId, trans);
                await this.walletRepo.setBalance(prevExpense.amount, prevExpense.walletId, trans);
                await this.walletRepo.setBalance((0 - data.amount), data.walletId, trans);
                await trans.commit();
                return updatedExpense;
            },
            async () => await trans.rollback()
        )
    }


    async deleteExpense(expenseId: string): Promise<IExpense> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const deletedExpense = await this.mainRepo.delete(expenseId, trans);
                await this.walletRepo.setBalance(deletedExpense.amount, deletedExpense.walletId, trans);
                await trans.commit();
                return deletedExpense;
            },
            async () => await trans.rollback()
        )
    }

    async restoreExpense(expenseId: string): Promise<IExpense> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const restoredExpense = await this.mainRepo.restore(expenseId, trans);
                await this.walletRepo.setBalance((0 - restoredExpense.amount), restoredExpense.walletId, trans);
                await trans.commit();
                return restoredExpense;
            },
            async () => await trans.rollback()
        )
    }


}