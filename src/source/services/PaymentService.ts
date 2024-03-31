import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import PaymentRepository from "@source/repositories/PaymentRepository";
import TenantConnection from "@app/db/TenantConnection";
import {
    EAmortizationStatus,
    EMoraStatus,
    IAmortization,
    IAmortizationView,
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

export default class PaymentService extends Service {
    private mainRepo = new PaymentRepository();
    private amortizationViewRepo = new AmortizationViewRepository();
    private amortizationRepo = new AmortizationRepository();
    private moraRepo = new MoraRepository();
    private walletRepo = new WalletRepository();
    private loanRepo = new LoanRepository();
    private  paymentStatRepo=new PaymentStatViewRepository();

    async getPayments(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findPayment(paymentId: number, params: IParams) {
        return await this.mainRepo.findById(paymentId, params)
    }

    async getPaymentStats(params: IParams){
        return await this.paymentStatRepo.getAll(params)
    }

    async createPayment(data: IPayment): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
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
                const newLoan = await this.loanRepo.update({
                    balance: newBalance,
                    nextPaymentDate: nextPaymentDate,
                    updatedBy: data.updatedBy
                }, loan.id, trans);
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