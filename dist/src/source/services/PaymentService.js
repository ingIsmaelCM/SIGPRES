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
const moment_timezone_1 = __importDefault(require("moment-timezone"));
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
    constructor() {
        super();
    }
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
            const isPayed = newBalance <= 0 && !data.justInterest;
            const newLoanData = {
                balance: data.justInterest ? loan.balance : newBalance,
                nextPaymentAt: (0, moment_timezone_1.default)(nextPaymentDate).format("YYYY-MM-DD"),
                updatedBy: data.updatedBy,
                status: isPayed ? SourceInterfaces_1.ELoanStatus.Pagado : loan.status
            };
            const newLoan = await this.loanRepo.update(newLoanData, loan.id, trans);
            const walletBalance = Number(payments.reduce((a, b) => a + b.amount, 0));
            if (data.justInterest) {
                let date = nextPaymentDate;
                const amortsToMove = await this.getAmortsFromLastDate(String(date), loan.id);
                for (const amort of amortsToMove.rows) {
                    await this.amortizationRepo.update({
                        date: date,
                        mora: amort.mora,
                        updatedBy: data.updatedBy
                    }, amort.id, trans);
                    date = amortization_1.default.moveDateCuota(date, loan.period);
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
            const amort = (await this.getAmortizationFromLoan(data))[0];
            const wallet = await this.walletRepo.findById(data.walletId);
            const total = data.capital + data.interest + data.mora;
            if (total <= 0) {
                return Promise.reject({
                    code: 422,
                    message: "No ingresó ningún valor"
                });
            }
            const loan = await this.loanRepo.findById(data.loanId, { include: "condition" });
            let newDate = amort.date;
            if (data.moveDate) {
                newDate = amortization_1.default.getDateCuota(new Date(newDate), loan.period).format('YYYY-MM-DD');
                Math.abs((0, moment_timezone_1.default)(amort.date).diff((0, moment_timezone_1.default)(newDate), "days"));
            }
            const isPayed = loan.balance === data.capital;
            const newStatus = isPayed ? SourceInterfaces_1.EAmortizationStatus.Pagado : SourceInterfaces_1.EAmortizationStatus.Pendiente;
            const payment = this.getPaymentFromCapitalAndData(data, loan);
            const newPayment = await this.mainRepo.create(payment, trans);
            if (amort.mora) {
                await this.saveMoraFromCapital(amort, data, loan, newPayment, trans);
            }
            let newAmort = amortization_1.default.getAmortization({
                amount: loan.balance - data.capital,
                term: loan.term,
                rate: loan.condition.rate,
                startAt: newDate,
                period: 1
            })[0];
            newAmort = {
                ...newAmort,
                cuota: isPayed ? amort.cuota : newAmort.cuota,
                interest: isPayed ? amort.interest : newAmort.interest,
                capital: isPayed ? amort.capital : newAmort.capital,
                status: newStatus,
                mora: isPayed ? data.mora : 0,
                updatedBy: data.updatedBy
            };
            if (newPayment.lawyerId) {
                await this.createPaymentForLawyerFromPayment(payment, trans);
            }
            const newLoan = await this.loanRepo.update({
                balance: newPayment.balanceAfter,
                nextPaymentAt: newDate,
                status: isPayed ? SourceInterfaces_1.ELoanStatus.Pagado : loan.status
            }, loan.id, trans);
            await this.amortizationRepo.update(newAmort, amort.id, trans);
            await this.walletRepo.setBalance(newPayment.amount, wallet.id, trans);
            await trans.commit();
            return newLoan;
        }, async () => await trans.rollback());
    }
    async createPaymentAbone(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            data.mora = 0;
            const amorts = (await this.getAmortizationFromLoan(data));
            const wallet = await this.walletRepo.findById(data.walletId);
            const total = data.capital + data.interest;
            if (total <= 0) {
                return Promise.reject({
                    code: 422,
                    message: "No ingresó ningún valor"
                });
            }
            const loan = await this.loanRepo.findById(data.loanId, { include: "condition" });
            let newDate = loan.nextPaymentAt;
            const isPayed = loan.balance === data.capital;
            const newStatus = isPayed ? SourceInterfaces_1.EAmortizationStatus.Pagado : SourceInterfaces_1.EAmortizationStatus.Pendiente;
            const payment = this.getPaymentFromCapitalAndData(data, loan);
            const newPayment = await this.mainRepo.create(payment, trans);
            let newAmorts = amortization_1.default.getAmortization({
                amount: loan.balance - data.capital,
                term: amorts.length,
                rate: loan.condition.rate,
                startAt: newDate,
                period: loan.period
            });
            let index = 0;
            for (const amort of newAmorts) {
                await this.amortizationRepo.updateOrCreate({
                    ...amort,
                    nro: amorts.at(index).nro,
                    loanId: loan.id,
                    clientId: loan.clientId,
                    updatedBy: data.updatedBy,
                    createdBy: data.createdBy,
                }, trans);
                index++;
            }
            if (newPayment.lawyerId) {
                await this.createPaymentForLawyerFromPayment(payment, trans);
            }
            const newLoan = await this.loanRepo.update({
                balance: newPayment.balanceAfter,
                status: isPayed ? SourceInterfaces_1.ELoanStatus.Pagado : loan.status
            }, loan.id, trans);
            await this.walletRepo.setBalance(newPayment.amount, wallet.id, trans);
            await trans.commit();
            return newLoan;
        }, async () => await trans.rollback());
    }
    async saveMoraFromCapital(amort, data, loan, newPayment, trans) {
        const mora = {
            initAmount: amort.initMora,
            lateAmount: amort.finalMora,
            status: data.mora ? SourceInterfaces_1.EMoraStatus.Cobrada : SourceInterfaces_1.EMoraStatus.Perdonada,
            dueAt: amort.date,
            closedAt: data.payedAt,
            loanId: loan.id,
            clientId: loan.clientId,
            paymentId: newPayment.id,
            createdBy: data.createdBy,
            updatedBy: data.updatedBy
        };
        await this.moraRepo.create(mora, trans);
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
                date: (0, moment_timezone_1.default)(payment.payedAt).format('YYYY-MM-DD'),
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
            amount: data.capital + data.interest + data.mora,
            capital: data.capital,
            interest: data.interest,
            mora: data.mora,
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
    async getAmortizationFromLoan(data) {
        const amorts = await this.amortizationViewRepo.getAll({
            filter: [
                `loanId:eq:${data.loanId}:and`,
                `status:eq:${SourceInterfaces_1.EAmortizationStatus.Pendiente}:and`
            ],
            order: "nro"
        });
        return amorts.rows;
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
                mora: data.omitMora ? 0 : amort.mora,
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