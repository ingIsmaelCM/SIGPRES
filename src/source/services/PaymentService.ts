import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import PaymentRepository from "@source/repositories/PaymentRepository";
import TenantConnection from "@app/db/TenantConnection";
import AmortizationViewRepository from "@source/repositories/AmortizationViewRepository";
import MoraRepository from "@source/repositories/MoraRepository";
import WalletRepository from "@source/repositories/WalletRepository";
import LoanRepository from "@source/repositories/LoanRepository";
import amortization from "@app/utils/amortization";
import AmortizationRepository from "@source/repositories/AmortizationRepository";
import PaymentStatViewRepository from "@source/repositories/PaymentStatViewRepository";
import moment from "moment";
import {Transaction} from "sequelize";
import LawyerPaymentRepository from "@source/repositories/LawyerPaymentRepository";
import LawyerRepository from "@source/repositories/LawyerRepository";
import {
    EAmortizationStatus,
    ELawyerPaymentStatus,
    ELawyerPaymode,
    EMoraStatus,
    IAmortizationView,
    ILawyerPayment,
    ILoan,
    IMora,
    IPayment
} from "@app/interfaces/SourceInterfaces";

export default class PaymentService extends Service {
    private mainRepo = new PaymentRepository();
    private amortizationViewRepo = new AmortizationViewRepository();
    private amortizationRepo = new AmortizationRepository();
    private moraRepo = new MoraRepository();
    private walletRepo = new WalletRepository();
    private loanRepo = new LoanRepository();
    private paymentStatRepo = new PaymentStatViewRepository();
    private lawyerPaymentRepo = new LawyerPaymentRepository();
    private lawyerRepo = new LawyerRepository();

    async getPayments(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findPayment(paymentId: string, params: IParams) {
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

    async createPaymentCuotas(data: Record<string, any>): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const amorts = await this.getAmortsFromData(data);
                const loan = await this.loanRepo.findById(amorts.rows.at(-1).loanId)
                const payments = this.getPaymentFromAmortsAndData(amorts, data);
                const newPayments = await this.mainRepo.bulkCreate(payments, trans);
                for (const pay of newPayments) {
                    if (pay.lawyerId) {
                        await this.createPaymentForLawyerFromPayment(pay, trans);
                    }
                }
                const moras = this.getMorasFromAmortsDataAndPayments(amorts, data, newPayments as any);
                await this.moraRepo.bulkCreate(moras, trans);
                const wallet = await this.walletRepo.findById(data.walletId);
                const nextPaymentDate = amortization.moveDateCuota(amorts.rows.at(-1).date, loan.period)
                const newBalance = Number(loan.balance) - Number(amorts.rows.reduce((a: number, b: IAmortizationView) =>
                    a + Number(b.capital), 0))
                const newLoanData = {
                    balance: data.justInterest ? loan.balance : newBalance,
                    nextPaymentAt: moment(nextPaymentDate).format("YYYY-MM-DD"),
                    updatedBy: data.updatedBy
                };
                const newLoan = await this.loanRepo.update(newLoanData, loan.id, trans);
                const walletBalance = Number(payments.reduce((a: number, b: IPayment) =>
                    a + b.amount, 0))
                if (data.justInterest) {
                    let date = nextPaymentDate;
                    const amortsToMove = await this.getAmortsFromLastDate(String(date), loan.id)
                    for (const amort of amortsToMove.rows) {
                        await this.amortizationRepo.update({
                            date: date,
                            mora: amort.mora,
                            updatedBy: data.updatedBy
                        }, amort.id!, trans);
                        date = amortization.moveDateCuota(date, loan.period)
                    }
                } else {
                    for (const amort of amorts.rows) {
                        await this.amortizationRepo.update({
                            status: EAmortizationStatus.Pagado,
                            mora: amort.mora,
                            updatedBy: data.updatedBy
                        }, amort.id!, trans);
                    }
                }
                await this.walletRepo.setBalance(walletBalance, wallet.id, trans);
                await trans.commit();
                return newLoan;
            },
            async () => await trans.rollback()
        )
    }

    async createPaymentCapital(data: Record<string, any>): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const amort: IAmortizationView = (await this.getAmortizationFromLoan(data))[0];
                const wallet = await this.walletRepo.findById(data.walletId);
                const total = data.capital + data.interest + data.mora;
                if(total<=0){
                    return Promise.reject({
                        code: 422,
                        message: "No ingresó ningún valor"
                    })
                }
                const loan = await this.loanRepo.findById(data.loanId, {include: "condition"});
                let newDate = amort.date;
                while (data.interest && moment().isAfter(moment(newDate))) {
                    newDate = amortization.getDateCuota(new Date(newDate), loan.period).format('YYYY-MM-DD')
                }
                const newStatus = loan.balance === data.capital ? EAmortizationStatus.Pagado : EAmortizationStatus.Pendiente;
                const payment = this.getPaymentFromCapitalAndData(data, loan);
                const newPayment = await this.mainRepo.create(payment, trans);
                if (amort.mora) {
                    await this.saveMoraFromCapital(amort, data, loan, newPayment, trans);
                }
                let newAmort = amortization.getAmortization({
                    amount: loan.balance - data.capital,
                    term: loan.term,
                    rate: loan.condition.rate,
                    startAt: newDate,
                    period: 1
                })[0];
                newAmort = {
                    ...newAmort,
                    status: newStatus,
                    mora: 0,
                    updatedBy: data.updatedBy
                }
                if (newPayment.lawyerId) {
                    await this.createPaymentForLawyerFromPayment(payment, trans);
                }
                const newLoan = await this.loanRepo.update({
                    balance: newPayment.balanceAfter,
                    nextPaymentAt: newDate
                }, loan.id, trans);
                const amortUpdated = await this.amortizationRepo.update(newAmort, amort.id!, trans);
                await this.walletRepo.setBalance(newPayment.amount, wallet.id, trans);
                await trans.commit();
                return newLoan;
            },
            async () => await trans.rollback())
    }


    private async saveMoraFromCapital(amort: IAmortizationView, data: Record<string, any>,
                                      loan: ILoan, newPayment: IPayment, trans: Transaction) {
        const mora: Partial<IMora> = {
            initAmount: amort.initMora,
            lateAmount: amort.finalMora,
            status: data.mora ? EMoraStatus.Cobrada : EMoraStatus.Perdonada,
            dueAt: amort.date,
            closedAt: data.payedAt,
            loanId: loan.id,
            clientId: loan.clientId,
            paymentId: newPayment.id!,
            createdBy: data.createdBy,
            updatedBy: data.updatedBy
        }
        await this.moraRepo.create(mora, trans)
    }

    private async createPaymentForLawyerFromPayment(payment: IPayment, trans: Transaction) {
        const lawyer = await this.lawyerRepo.findById(payment.lawyerId!);
        if (lawyer.payMode == ELawyerPaymode.Cuota || lawyer.payMode == ELawyerPaymode.Porcentaje) {
            const newLayerPayment: ILawyerPayment = {
                amount: lawyer.payment == ELawyerPaymode.Contrato ?
                    lawyer.payPrice :
                    (payment.amount * (lawyer.payPrice / 100)),
                paymentId: payment.id,
                loanId: payment.loanId,
                date: moment(payment.payedAt).format('YYYY-MM-DD'),
                status: ELawyerPaymentStatus.Pendiente,
                payPrice: lawyer.payPrice,
                createdBy: payment.createdBy,
                updatedBy: payment.updatedBy,
                lawyerId: lawyer.id
            }
            await this.lawyerPaymentRepo.create(newLayerPayment, trans);
        }
    }

    private getPaymentFromCapitalAndData(data: Record<string, any>, loan: ILoan) {
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
            loanId: loan.id!,
            clientId: loan.clientId,
            note: data.note,
            createdBy: data.createdBy,
            updatedBy: data.updatedBy

        };
    }

    private async getAmortizationFromLoan(data: Record<string, any>) {
        const amorts = await this.amortizationViewRepo.getAll({
            filter: [
                `loanId:eq:${data.loanId}:and`,
                `status:eq:${EAmortizationStatus.Pendiente}:and`
            ],
            order: "nro"
        })
        return amorts.rows.map((amort: any) => amort.dataValues);
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
        return amorts.rows.map((amort: IAmortizationView) => {
            const capital = data.justInterest ? 0 : amort.capital;
            const cuota = data.justInterest ? (amort.cuota - amort.capital) : amort.cuota
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

            }
        })
    }

    private async getAmortsFromData(data: Record<string, any>) {
        return await this.amortizationViewRepo.getAll({
            filter: [
                `id:in:${data.cuotas.join(',')}:and`,
                `status:eq:${EAmortizationStatus.Pendiente}:and`
            ],
            order: "date",
            desc: false
        })
    }

    private async getAmortsFromLastDate(date: string, loanId: string) {
        return await this.amortizationViewRepo.getAll({
            filter: [
                `date:gte:${date}:and`,
                `loanId:eq:${loanId}:and`,
                `status:eq:${EAmortizationStatus.Pendiente}:and`
            ],
            order: "date",
            desc: false
        })
    }

    async updatePayment(paymentId: string, data: IPayment): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


    async deletePayment(paymentId: string): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restorePayment(paymentId: string): Promise<IPayment> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}