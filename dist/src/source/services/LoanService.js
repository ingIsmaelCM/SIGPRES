"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const LoanRepository_1 = __importDefault(require("@source/repositories/LoanRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
const amortization_1 = __importDefault(require("@app/utils/amortization"));
const ConditionRepository_1 = __importDefault(require("@source/repositories/ConditionRepository"));
const AmortizationRepository_1 = __importDefault(require("@source/repositories/AmortizationRepository"));
const WalletRepository_1 = __importDefault(require("@source/repositories/WalletRepository"));
const LawyerPaymentRepository_1 = __importDefault(require("@source/repositories/LawyerPaymentRepository"));
const LawyerRepository_1 = __importDefault(require("@source/repositories/LawyerRepository"));
const sequelize_1 = require("sequelize");
class LoanService extends Service_1.default {
    mainRepo = new LoanRepository_1.default();
    conditionRepo = new ConditionRepository_1.default();
    amortizationRepo = new AmortizationRepository_1.default();
    walletRepo = new WalletRepository_1.default();
    lawyerPaymentRepo = new LawyerPaymentRepository_1.default();
    lawyerRepo = new LawyerRepository_1.default();
    async getLoans(params) {
        return await this.mainRepo.getAll(params);
    }
    async findLoan(loanId, params) {
        return await this.mainRepo.findById(loanId, params);
    }
    async createLoan(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const amortizations = amortization_1.default.getAmortization(data)
                .map((amort) => ({
                ...amort,
                createdBy: data.createdBy,
                updatedBy: data.updatedBy
            }));
            data.endAt = amortizations.at(-1).date;
            data.startAt = amortizations.at(0).date;
            data.nextPaymentAt = amortizations.at(0).date;
            data.balance = data.amount;
            const newLoan = await this.mainRepo.create(data, trans);
            const newCondition = await this.conditionRepo
                .create({ ...data, loanId: newLoan.id }, trans);
            const amorts = await this.amortizationRepo
                .createFromLoan(amortizations, newLoan.id, data.clientId, trans);
            await trans.commit();
            return { ...newLoan.dataValues, condition: newCondition.dataValues, amortizations: amorts };
        }, async () => await trans.rollback());
    }
    async createPaymentForLawyerFromLoan(lawyerId, newLoan, trans) {
        const lawyer = await this.lawyerRepo.findById(lawyerId);
        if (lawyer.payMode === SourceInterfaces_1.ELawyerPaymode.Contrato) {
            const newLayerPayment = {
                amount: lawyer.payPrice,
                date: newLoan.startAt,
                loanId: newLoan.id,
                status: SourceInterfaces_1.ELawyerPaymentStatus.Pendiente,
                payPrice: lawyer.payPrice,
                createdBy: newLoan.createdBy,
                updatedBy: newLoan.updatedBy,
                lawyerId: lawyerId
            };
            await this.lawyerPaymentRepo.create(newLayerPayment, trans);
        }
    }
    async confirmLoan(loanId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const loan = await this.mainRepo.findById(loanId, { include: "condition" });
            if (loan.startAt !== data.startAt) {
                const dataForAmortization = {
                    amount: loan.amount,
                    term: loan.term,
                    rate: loan.condition.rate,
                    startAt: data.startAt,
                    period: loan.period
                };
                const amortizations = amortization_1.default.getAmortization(dataForAmortization)
                    .map((amort) => ({
                    ...amort,
                    loanId: loan.id,
                    clientId: loan.clientId,
                    createdBy: data.createdBy,
                    updatedBy: data.updatedBy
                }));
                data.nextPaymentAt = amortizations.at(0).date;
                for (const amort of amortizations) {
                    await this.amortizationRepo.updateOrCreate(amort, trans);
                }
            }
            if (loan.lawyerId) {
                await this.createPaymentForLawyerFromLoan(loan.lawyerId, loan, trans);
            }
            await this.walletRepo.setBalance((0 - loan.amount), data.walletId, trans);
            await this.mainRepo.update({ ...data, status: SourceInterfaces_1.ELoanStatus.Aprobado }, loan.id, trans);
            await trans.commit();
            return loan;
        }, async () => await trans.rollback());
    }
    async declineLoan(loanId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            await this.mainRepo.update({
                status: SourceInterfaces_1.ELoanStatus.Rechazado,
                updatedBy: data.updatedBy
            }, loanId, trans);
            await this.amortizationRepo.bulkUpdate({ status: SourceInterfaces_1.EAmortizationStatus.Cancelado }, {
                where: {
                    loanId: loanId
                }
            }, trans);
            await trans.commit();
            return true;
        }, async () => await trans.rollback());
    }
    async updateLoan(loanId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const loan = await this.mainRepo.findById(loanId, { include: "amortizations,condition" });
            const oldWallet = await this.walletRepo.findById(loan.walletId);
            const newWallet = await this.walletRepo.findById(data.walletId);
            let newAmorts = amortization_1.default.getAmortization(data)
                .map((amort) => ({
                ...amort,
                createdBy: data.updatedBy,
                updatedBy: data.updatedBy
            }));
            await this.amortizationRepo.bulkDelete({ where: { loanId: loanId } }, true, trans);
            data.endAt = newAmorts.at(-1).date;
            data.startAt = newAmorts.at(0).date;
            data.nextPaymentAt = newAmorts.at(0).date;
            data.balance = data.amount;
            const newLoan = await this.mainRepo.update(data, loanId, trans);
            await this.conditionRepo
                .update({ ...data, loanId: newLoan.id }, loan.condition.id, trans);
            if (loan.status === SourceInterfaces_1.ELoanStatus.Aprobado) {
                if (loan.lawyerId) {
                    await this.lawyerPaymentRepo.bulkDelete({
                        where: {
                            [sequelize_1.Op.and]: [{ lawyerId: loan.lawyerId }, { loanId: loan.id }],
                        }
                    }, true, trans);
                    await this.createPaymentForLawyerFromLoan(loan.lawyerId, loan, trans);
                }
                if (oldWallet?.id === newWallet?.id) {
                    if (newWallet) {
                        await this.walletRepo.setBalance(loan.amount - data.amount, oldWallet.id, trans);
                    }
                }
                else {
                    if (oldWallet) {
                        await this.walletRepo.setBalance(loan.amount, oldWallet.id, trans);
                    }
                    if (newWallet) {
                        await this.walletRepo.setBalance(0 - data.amount, newWallet.id, trans);
                    }
                }
            }
            await this.amortizationRepo
                .createFromLoan(newAmorts, newLoan.id, data.clientId, trans);
            await trans.commit();
            return newLoan;
        }, async () => await trans.rollback());
    }
    async deleteLoan(loanId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async restoreLoan(loanId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
}
exports.default = LoanService;
//# sourceMappingURL=LoanService.js.map