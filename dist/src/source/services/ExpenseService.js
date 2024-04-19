"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const ExpenseRepository_1 = __importDefault(require("@source/repositories/ExpenseRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
const WalletRepository_1 = __importDefault(require("@source/repositories/WalletRepository"));
const sequelize_1 = require("sequelize");
const LawyerPaymentRepository_1 = __importDefault(require("@source/repositories/LawyerPaymentRepository"));
class ExpenseService extends Service_1.default {
    mainRepo = new ExpenseRepository_1.default();
    walletRepo = new WalletRepository_1.default();
    lawyerPaymentRepo = new LawyerPaymentRepository_1.default();
    async getExpenses(params) {
        return await this.mainRepo.getAll(params);
    }
    async findExpense(expenseId, params) {
        return await this.mainRepo.findById(expenseId, params);
    }
    async createExpense(data, externTrans) {
        const trans = externTrans || await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const newExpense = await this.mainRepo.create(data, trans);
            await this.walletRepo.setBalance((0 - data.amount), data.walletId, trans);
            if (!externTrans) {
                await trans.commit();
            }
            return newExpense;
        }, async () => {
            if (!externTrans) {
                await trans.rollback();
            }
        });
    }
    async createExpenseFromLawyer(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            await this.lawyerPaymentRepo.bulkUpdate({
                walletId: data.walletId,
                status: SourceInterfaces_1.ELawyerPaymentStatus.Pagado,
                closedAt: data.date,
                updatedBy: data.updatedBy
            }, {
                where: {
                    id: {
                        [sequelize_1.Op.in]: data.lawyerPaymentIds
                    }
                }
            }, trans);
            const newExpense = await this.mainRepo.create(data, trans);
            await this.walletRepo.setBalance((0 - data.amount), data.walletId, trans);
            await trans.commit();
            return newExpense;
        }, async () => await trans.rollback());
    }
    async updateExpense(expenseId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const prevExpense = await this.mainRepo.findById(expenseId);
            const updatedExpense = await this.mainRepo.update(data, expenseId, trans);
            await this.walletRepo.setBalance(prevExpense.amount, prevExpense.walletId, trans);
            await this.walletRepo.setBalance((0 - data.amount), data.walletId, trans);
            await trans.commit();
            return updatedExpense;
        }, async () => await trans.rollback());
    }
    async deleteExpense(expenseId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const deletedExpense = await this.mainRepo.delete(expenseId, trans);
            await this.walletRepo.setBalance(deletedExpense.amount, deletedExpense.walletId, trans);
            await trans.commit();
            return deletedExpense;
        }, async () => await trans.rollback());
    }
    async restoreExpense(expenseId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const restoredExpense = await this.mainRepo.restore(expenseId, trans);
            await this.walletRepo.setBalance((0 - restoredExpense.amount), restoredExpense.walletId, trans);
            await trans.commit();
            return restoredExpense;
        }, async () => await trans.rollback());
    }
}
exports.default = ExpenseService;
//# sourceMappingURL=ExpenseService.js.map