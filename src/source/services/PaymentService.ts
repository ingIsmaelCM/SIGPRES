import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import PaymentRepository from "@source/repositories/PaymentRepository";
import TenantConnection from "@app/db/TenantConnection";
import {
    EAmortizationStatus,
    EMoraStatus,
    IAmortization,
    IAmortizationView, ILoan, ILoanRelation,
    IMora,
    IPayment
} from "@app/interfaces/SourceInterfaces";
import AmortizationViewRepository from "@source/repositories/AmortizationViewRepository";
import MoraRepository from "@source/repositories/MoraRepository";
import WalletRepository from "@source/repositories/WalletRepository";
import LoanRepository from "@source/repositories/LoanRepository";
import amortization from "@app/utils/amortization";
import AmortizationRepository from "@source/repositories/AmortizationRepository";
import PaymentStatViewRepository from "@source/repositories/PaymentStatViewRepository";
import moment from "moment";

export default class PaymentService extends Service {
    private mainRepo = new PaymentRepository();
    private amortizationViewRepo = new AmortizationViewRepository();
    private amortizationRepo = new AmortizationRepository();
    private moraRepo = new MoraRepository();
    private walletRepo = new WalletRepository();
    private loanRepo = new LoanRepository();
    private paymentStatRepo = new PaymentStatViewRepository();

    async getPayments(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findPayment(paymentId: number, params: IParams) {
        return await this.mainRepo.findById(paymentId, params)
    }

    async getPaymentStats(params: IParams) {
        return await this.paymentStatRepo.getAll(params)
    }

    async createPayment(data: IPayment): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async createPaymentCapital(data: Record<string, any>): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const amorts = await this.getAmortizationFromLoan(data);
                const loan = await this.loanRepo.findById(data.loanId, {include: "condition"});
                const wallet = await this.walletRepo.findById(data.walletId);
                let newAmorts = [];
                const dataForAmort = this.getDataForAmort(loan, data, amorts);
                if (data.keep == 'dates') {
                    dataForAmort.term = amorts.length
                    newAmorts = this.getAmortsFromSetCapital(amorts, dataForAmort);
                } else {
                    let cuotas: number = amortization.getCantidadCuotas(loan.balance - data.capital,
                        loan.condition.rate, amorts.at(0).cuota)
                    cuotas = Math.round(cuotas) || 1;
                    dataForAmort.term = cuotas
                    newAmorts = this.getAmortsFromSetCapital(amorts, dataForAmort)
                    for (const amort of amorts) {
                        if (!(newAmorts.some((a: IAmortization) => amort.nro === a.nro))) {
                            await this.amortizationRepo.delete(amort.id, trans);
                        }
                    }
                }
                for (const amort of newAmorts) {
                    await this.amortizationRepo.updateOrCreate(amort, trans)
                }
                const payment = this.getPaymentFromCapitalAndData(data, loan);
                await this.mainRepo.create(payment, trans);
                const newLoan = this.loanRepo.update({balance: payment.balanceAfter}, loan.id, trans);
                await this.walletRepo.setBalance(payment.amount, wallet.id, trans);
                await trans.commit();
                return newLoan;
            },
            async () => await trans.rollback())
    }

    private getPaymentFromCapitalAndData(data: Record<string, any>, loan: ILoan) {
        return {
            amount: data.capital + data.interest,
            capital: data.capital,
            interest: data.interest,
            balanceBefore: loan.balance,
            balanceAfter: Number(loan.balance - data.capital).toFixed(2),
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

    private getDataForAmort(loan: ILoan & ILoanRelation, data: Record<string, any>, amorts: any[]) {
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
        }
    }

    private getAmortsFromSetCapital(amorts: any[], dataForAmort: any) {
        return amortization.getAmortization(dataForAmort).map((newAmort: any, index: number) => {
            return {
                ...newAmort,
                nro: amorts.at(index).nro,
                date: amorts.at(index).date,
                loanId: dataForAmort.loanId,
                clientId: dataForAmort.clientId,
                createdBy: dataForAmort.createdBy,
                updatedBy: dataForAmort.updatedBy
            }
        })
    }

    private async getAmortizationFromLoan(data: Record<string, any>) {
        const amorts = await this.amortizationRepo.getAll({
            filter: [
                `loanId:eq:${data.loanId}:and`,
                `status:eq:${EAmortizationStatus.Pendiente}:and`
            ]
        })
        return amorts.rows.map((amort: any) => amort.dataValues);
    }

    async createPaymentCuotas(data: Record<string, any>): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const amorts = await this.getAmortsFromData(data);
                const loan = await this.loanRepo.findById(amorts.rows.at(-1).loanId)
                const payments = this.getPaymentFromAmortsAndData(amorts, data);
                const newPayments = await this.mainRepo.bulkCreate(payments, trans);
                const moras = this.getMorasFromAmortsDataAndPayments(amorts, data, newPayments);
                await this.moraRepo.bulkCreate(moras, trans);
                const wallet = await this.walletRepo.findById(data.walletId);
                const nextPaymentDate = amortization.moveDateCuota([amorts.rows.at(-1).date], loan.period)[0]
                const newBalance = Number(loan.balance) - Number(amorts.rows.reduce((a: number, b: IAmortizationView) =>
                    a + Number(b.capital), 0))
                const newLoanData = {
                    balance: newBalance,
                    nextPaymentAt: moment(nextPaymentDate).format("YYYY-MM-DD"),
                    updatedBy: data.updatedBy
                };
                const newLoan = await this.loanRepo.update(newLoanData, loan.id, trans);
                console.log(newLoan)
                const walletBalance = Number(payments.reduce((a: number, b: IPayment) =>
                    a + b.amount, 0))
                for (const amort of amorts.rows) {
                    await this.amortizationRepo.update({
                        status: EAmortizationStatus.Pagado,
                        mora: amort.mora,
                        updatedBy: data.updatedBy
                    }, amort.id!, trans);
                }
                await this.walletRepo.setBalance(walletBalance, wallet.id, trans);
                await trans.commit();
                return newLoan;
            },
            async () => await trans.rollback()
        )
    }

    private getMorasFromAmortsDataAndPayments(amorts: any, data: Record<string, any>, newPayments: IPayment[]) {
        return amorts.rows.filter((amort: IAmortizationView) => amort.isExpired)
            .map((amort: IAmortizationView, index: number) => ({
                initAmount: amort.initMora,
                lateAmount: amort.finalMora,
                status: data.omitMora ? EMoraStatus.Perdonada : EMoraStatus.Cobrada,
                dueAt: amort.date,
                closedAt: data.payedAt,
                loanId: amort.loanId,
                paymentId: newPayments[index].id,
                clientId: amort.clientId,
                createdBy: data.createdBy,
                updatedBy: data.updatedBy
            }))
    }

    private getPaymentFromAmortsAndData(amorts: any, data: Record<string, any>) {
        return amorts.rows.map((amort: IAmortizationView) => ({
            amount: data.omitMora ? (amort.cuota - amort.mora) : amort.cuota,
            capital: amort.capital,
            interest: amort.interest,
            balanceBefore: Number(amort.balance) + Number(amort.capital),
            balanceAfter: amort.balance,
            dueAt: amort.date,
            payedAt: data.payedAt,
            walletId: data.walletId,
            lawyerId: data.lawyerId,
            loanId: amort.loanId,
            clientId: amort.clientId,
            note: data.note,
            createdBy: data.createdBy,
            updatedBy: data.updatedBy

        }))
    }

    private async getAmortsFromData(data: Record<string, any>) {
        return await this.amortizationViewRepo.getAll({
            filter: [
                `id:in:${data.cuotas.join(',')}:and`,
                `status:eq:${EAmortizationStatus.Pendiente}:and`
            ]
        })
    }

    async updatePayment(paymentId: number, data: IPayment): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deletePayment(paymentId: number): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restorePayment(paymentId: number): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}