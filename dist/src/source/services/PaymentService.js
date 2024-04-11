"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const PaymentRepository_1 = __importDefault(require("@source/repositories/PaymentRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const AmortizationViewRepository_1 = __importDefault(require("@source/repositories/AmortizationViewRepository"));
const MoraRepository_1 = __importDefault(require("@source/repositories/MoraRepository"));
const WalletRepository_1 = __importDefault(require("@source/repositories/WalletRepository"));
const LoanRepository_1 = __importDefault(require("@source/repositories/LoanRepository"));
const amortization_1 = __importDefault(require("@app/utils/amortization"));
const AmortizationRepository_1 = __importDefault(require("@source/repositories/AmortizationRepository"));
const PaymentStatViewRepository_1 = __importDefault(require("@source/repositories/PaymentStatViewRepository"));
const moment_1 = __importDefault(require("moment"));
const LawyerPaymentRepository_1 = __importDefault(require("@source/repositories/LawyerPaymentRepository"));
const LawyerRepository_1 = __importDefault(require("@source/repositories/LawyerRepository"));
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
class PaymentService extends Service_1.default {
    mainRepo = new PaymentRepository_1.default();
    amortizationViewRepo = new AmortizationViewRepository_1.default();
    amortizationRepo = new AmortizationRepository_1.default();
    moraRepo = new MoraRepository_1.default();
    walletRepo = new WalletRepository_1.default();
    loanRepo = new LoanRepository_1.default();
    paymentStatRepo = new PaymentStatViewRepository_1.default();
    lawyerPaymentRepo = new LawyerPaymentRepository_1.default();
    lawyerRepo = new LawyerRepository_1.default();
    async getPayments(params) {
        return await this.mainRepo.getAll(params);
    }
    async findPayment(paymentId, params) {
        return await this.mainRepo.findById(paymentId, params);
    }
    async getPaymentStats(params) {
        return await this.paymentStatRepo.getAll(params);
    }
    async createPayment(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async createPaymentCuotas(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const amorts = await this.getAmortsFromData(data);
            const loan = await this.loanRepo.findById(amorts.rows.at(-1).loanId);
            const payments = this.getPaymentFromAmortsAndData(amorts, data);
            const newPayments = await this.mainRepo.bulkCreate(payments, trans);
            for (const pay of newPayments) {
                if (pay.lawyerId) {
                    await this.createPaymentForLawyerFromPayment(pay, trans);
                }
            }
            const moras = this.getMorasFromAmortsDataAndPayments(amorts, data, newPayments);
            await this.moraRepo.bulkCreate(moras, trans);
            const wallet = await this.walletRepo.findById(data.walletId);
            const nextPaymentDate = amortization_1.default.moveDateCuota(amorts.rows.at(-1).date, loan.period);
            const newBalance = Number(loan.balance) - Number(amorts.rows.reduce((a, b) => a + Number(b.capital), 0));
            const newLoanData = {
                balance: data.justInterest ? loan.balance : newBalance,
                nextPaymentAt: (0, moment_1.default)(nextPaymentDate).format("YYYY-MM-DD"),
                updatedBy: data.updatedBy
            };
            const newLoan = await this.loanRepo.update(newLoanData, loan.id, trans);
            const walletBalance = Number(payments.reduce((a, b) => a + b.amount, 0));
            if (data.justInterest) {
                let date = nextPaymentDate;
                const amortsToMove = await this.getAmortsFromLastDate(String(date), loan.id);
                for (const amort of amortsToMove.rows) {
                    date = amortization_1.default.moveDateCuota(date, loan.period);
                    await this.amortizationRepo.update({
                        date: date,
                        mora: amort.mora,
                        updatedBy: data.updatedBy
                    }, amort.id, trans);
                }
            }
            else {
                for (const amort of amorts.rows) {
                    await this.amortizationRepo.update({
                        status: SourceInterfaces_1.EAmortizationStatus.Pagado,
                        mora: amort.mora,
                        updatedBy: data.updatedBy
                    }, amort.id, trans);
                }
            }
            await this.walletRepo.setBalance(walletBalance, wallet.id, trans);
            await trans.commit();
            return newLoan;
        }, async () => await trans.rollback());
    }
    async createPaymentCapital(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const pendingAmorts = await this.getAmortizationFromLoan(data);
            const loan = await this.loanRepo.findById(data.loanId, { include: "condition" });
            const wallet = await this.walletRepo.findById(data.walletId);
            let newAmorts = [];
            const dataForAmort = this.getDataForAmort(loan, data, pendingAmorts);
            if (data.keep == 'dates') {
                dataForAmort.term = pendingAmorts.length;
                newAmorts = this.getAmortsFromSetCapital(pendingAmorts, dataForAmort);
            }
            else {
                let cuotas = amortization_1.default.getCantidadCuotas(loan.balance - data.capital, loan.condition.rate, pendingAmorts.at(0).cuota);
                cuotas = Math.round(cuotas) || 1;
                dataForAmort.term = cuotas;
                newAmorts = this.getAmortsFromSetCapital(pendingAmorts, dataForAmort);
                for (const amort of pendingAmorts) {
                    if (!(newAmorts.some((a) => amort.nro === a.nro))) {
                        await this.amortizationRepo.delete(amort.id, trans);
                    }
                }
            }
            newAmorts = this.checkIfBalanceIsZero(newAmorts, pendingAmorts, data);
            for (const amort of newAmorts) {
                await this.amortizationRepo.updateOrCreate(amort, trans);
            }
            const payment = this.getPaymentFromCapitalAndData(data, loan);
            if (payment.lawyerId) {
                await this.createPaymentForLawyerFromPayment(payment, trans);
            }
            await this.mainRepo.create(payment, trans);
            const newLoan = await this.loanRepo.update({ balance: payment.balanceAfter }, loan.id, trans);
            await this.walletRepo.setBalance(payment.amount, wallet.id, trans);
            await trans.commit();
            return newLoan;
        }, async () => await trans.rollback());
    }
    checkIfBalanceIsZero(newAmorts, pendingAmorts, data) {
        if (newAmorts.at(0)?.balance === 0) {
            for (const index in newAmorts) {
                const pendingAmort = pendingAmorts[index];
                newAmorts[index] = {
                    ...pendingAmort,
                    status: SourceInterfaces_1.EAmortizationStatus.Pagado,
                    capital: data.capital / newAmorts.length,
                    interest: data.interest / newAmorts.length,
                    cuota: (data.capital + data.interest) / newAmorts.length,
                    balance: 0
                };
            }
        }
        return newAmorts;
    }
    async createPaymentForLawyerFromPayment(payment, trans) {
        const lawyer = await this.lawyerRepo.findById(payment.lawyerId);
        if (lawyer.payMode == SourceInterfaces_1.ELawyerPaymode.Cuota || lawyer.payMode == SourceInterfaces_1.ELawyerPaymode.Porcentaje) {
            const newLayerPayment = {
                amount: lawyer.payment == SourceInterfaces_1.ELawyerPaymode.Contrato ?
                    lawyer.payPrice :
                    (payment.amount * (lawyer.payPrice / 100)),
                paymentId: payment.id,
                loanId: payment.loanId,
                date: (0, moment_1.default)(payment.payedAt).format('YYYY-MM-DD'),
                status: SourceInterfaces_1.ELawyerPaymentStatus.Pendiente,
                payPrice: lawyer.payPrice,
                createdBy: payment.createdBy,
                updatedBy: payment.updatedBy,
                lawyerId: lawyer.id
            };
            await this.lawyerPaymentRepo.create(newLayerPayment, trans);
        }
    }
    getPaymentFromCapitalAndData(data, loan) {
        return {
            amount: data.capital + data.interest,
            capital: data.capital,
            interest: data.interest,
            balanceBefore: loan.balance,
            balanceAfter: Number(Number(loan.balance - data.capital).toFixed(2)),
            dueAt: data.payedAt,
            payedAt: data.payedAt,
            walletId: data.walletId,
            lawyerId: data.lawyerId,
            loanId: loan.id,
            clientId: loan.clientId,
            note: data.note,
            createdBy: data.createdBy,
            updatedBy: data.updatedBy
        };
    }
    getDataForAmort(loan, data, amorts) {
        return {
            amount: loan.balance - data.capital,
            rate: loan.condition.rate,
            term: 0,
            startAt: amorts.at(-1).date,
            period: loan.period,
            loanId: data.loanId,
            clientId: loan.clientId,
            createdBy: data.createdBy,
            updatedBy: data.updatedBy
        };
    }
    getAmortsFromSetCapital(amorts, dataForAmort) {
        return amortization_1.default.getAmortization(dataForAmort).map((newAmort, index) => {
            return {
                ...newAmort,
                nro: amorts.at(index).nro,
                date: amorts.at(index).date,
                loanId: dataForAmort.loanId,
                clientId: dataForAmort.clientId,
                createdBy: dataForAmort.createdBy,
                updatedBy: dataForAmort.updatedBy
            };
        });
    }
    async getAmortizationFromLoan(data) {
        const amorts = await this.amortizationRepo.getAll({
            filter: [
                `loanId:eq:${data.loanId}:and`,
                `status:eq:${SourceInterfaces_1.EAmortizationStatus.Pendiente}:and`
            ],
            order: "nro"
        });
        return amorts.rows.map((amort) => amort.dataValues);
    }
    getMorasFromAmortsDataAndPayments(amorts, data, newPayments) {
        return amorts.rows.filter((amort) => amort.isExpired)
            .map((amort, index) => ({
            initAmount: amort.initMora,
            lateAmount: amort.finalMora,
            status: data.omitMora ? SourceInterfaces_1.EMoraStatus.Perdonada : SourceInterfaces_1.EMoraStatus.Cobrada,
            dueAt: amort.date,
            closedAt: data.payedAt,
            loanId: amort.loanId,
            paymentId: newPayments[index].id,
            clientId: amort.clientId,
            createdBy: data.createdBy,
            updatedBy: data.updatedBy
        }));
    }
    getPaymentFromAmortsAndData(amorts, data) {
        return amorts.rows.map((amort) => {
            const capital = data.justInterest ? 0 : amort.capital;
            const cuota = data.justInterest ? (amort.cuota - amort.capital) : amort.cuota;
            return {
                amount: data.omitMora ? (cuota - amort.mora) : cuota,
                capital: capital,
                interest: amort.interest,
                balanceBefore: Number(amort.balance) + Number(amort.capital),
                balanceAfter: data.justInterest ? Number(amort.balance) + Number(amort.capital) : amort.balance,
                dueAt: amort.date,
                payedAt: data.payedAt,
                walletId: data.walletId,
                lawyerId: data.lawyerId,
                loanId: amort.loanId,
                clientId: amort.clientId,
                note: data.note,
                createdBy: data.createdBy,
                updatedBy: data.updatedBy
            };
        });
    }
    async getAmortsFromData(data) {
        return await this.amortizationViewRepo.getAll({
            filter: [
                `id:in:${data.cuotas.join(',')}:and`,
                `status:eq:${SourceInterfaces_1.EAmortizationStatus.Pendiente}:and`
            ],
            order: "date",
            desc: false
        });
    }
    async getAmortsFromLastDate(date, loanId) {
        return await this.amortizationViewRepo.getAll({
            filter: [
                `date:gte:${date}:and`,
                `loanId:eq:${loanId}:and`,
                `status:eq:${SourceInterfaces_1.EAmortizationStatus.Pendiente}:and`
            ],
            order: "date",
            desc: false
        });
    }
    async updatePayment(paymentId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async deletePayment(paymentId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async restorePayment(paymentId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
}
exports.default = PaymentService;
//# sourceMappingURL=PaymentService.js.map