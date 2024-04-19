import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import LoanRepository from "@source/repositories/LoanRepository";
import TenantConnection from "@app/db/TenantConnection";
import {
    EAmortizationStatus,
    ELawyerPaymentStatus,
    ELawyerPaymode,
    ELoanStatus, IAmortization, IExpense,
    ILawyerPayment,
    ILoan, ILoanRelation
} from "@app/interfaces/SourceInterfaces";
import amortization from "@app/utils/amortization";
import ConditionRepository from "@source/repositories/ConditionRepository";
import AmortizationRepository from "@source/repositories/AmortizationRepository";
import WalletRepository from "@source/repositories/WalletRepository";
import LawyerPaymentRepository from "@source/repositories/LawyerPaymentRepository";
import LawyerRepository from "@source/repositories/LawyerRepository";
import {Op, Transaction} from "sequelize";
import moment from "moment";
import ExpenseService from "@source/services/ExpenseService";

export default class LoanService extends Service {
    private mainRepo = new LoanRepository();
    private conditionRepo = new ConditionRepository();
    private amortizationRepo = new AmortizationRepository();
    private walletRepo = new WalletRepository();
    private lawyerPaymentRepo = new LawyerPaymentRepository();
    private lawyerRepo = new LawyerRepository();

    async getLoans(params: IParams) {
        return await this.mainRepo.getAll(params)
    }

    async findLoan(loanId: string, params: IParams) {
        return await this.mainRepo.findById(loanId, params)
    }

    async createLoan(data: ILoan): Promise<ILoan> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const amortizations = amortization.getAmortization(data)
                    .map((amort: {}) => ({
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
                    .create({...data, loanId: newLoan.id}, trans);
                const amorts = await this.amortizationRepo
                    .createFromLoan(amortizations, newLoan.id!, data.clientId, trans);
                await trans.commit();
                return {...newLoan.dataValues, condition: newCondition.dataValues, amortizations: amorts}
            },
            async () => await trans.rollback()
        )
    }

    private async createPaymentForLawyerFromLoan(lawyerId: string, newLoan: ILoan, trans: Transaction) {
        const lawyer = await this.lawyerRepo.findById(lawyerId);
        if (lawyer.payMode === ELawyerPaymode.Contrato) {
            const newLayerPayment: ILawyerPayment = {
                amount: lawyer.payPrice,
                date: moment(newLoan.createdAt).format('YYYY-MM-DD'),
                loanId: newLoan.id,
                status: ELawyerPaymentStatus.Pendiente,
                payPrice: lawyer.payPrice,
                createdBy: newLoan.createdBy,
                updatedBy: newLoan.updatedBy,
                lawyerId: lawyerId
            }
            await this.lawyerPaymentRepo.create(newLayerPayment, trans);
        }
    }

    async confirmLoan(loanId: string, data: Record<string, any>) {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const loan = await this.mainRepo.findById(loanId, {include: "condition"});
                if (loan.startAt !== data.startAt) {
                    const dataForAmortization =
                        {
                            amount: loan.amount,
                            term: loan.term,
                            rate: loan.condition.rate,
                            startAt: data.startAt,
                            period: loan.period
                        }
                    const amortizations = amortization.getAmortization(dataForAmortization)
                        .map((amort: {}) => ({
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
                await this.mainRepo.update({...data, status: ELoanStatus.Aprobado}, loan.id, trans);
                await trans.commit();
                return loan
            },
            async () => await trans.rollback()
        )
    }

    async declineLoan(loanId: string, data: any) {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                await this.mainRepo.update({
                    status: ELoanStatus.Rechazado,
                    updatedBy: data.updatedBy
                }, loanId, trans);
                await this.amortizationRepo.bulkUpdate({status: EAmortizationStatus.Cancelado},
                    {
                        where: {
                            loanId: loanId
                        }
                    }, trans);
                await trans.commit();
                return true;
            },
            async () => await trans.rollback()
        )
    }

    async rechargeLoan(loanId: string, data: ILoan): Promise<ILoan> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            const loan = await this.mainRepo.findById(loanId, {include: "condition"});
            const amorts = (await this.amortizationRepo.getAll({
                filter: [
                    `loanId:eq:${loanId}:and`,
                    `status:eq:${EAmortizationStatus.Pendiente}:and`
                ],
                order: "nro"
            })).rows;
            const newBalance=Number(loan.balance) + Number(data.amount);
            let newAmorts = this.getNewAmorts(newBalance, amorts, loan);
            for(const amort of newAmorts){
                await this.amortizationRepo.updateOrCreate(amort, trans);
            }
            const loanUpdated=await this.mainRepo.update({balance: newBalance}, loanId, trans);
            const expenseData: IExpense={
                amount: data.amount,
                date: loanUpdated.updatedAt!,
                concepto: `Reenganche al préstamo ${loan.code}`,
                walletId: data.walletId,
                createdBy: data.createdBy,
                updatedBy: data.updatedBy
            }
            await  new ExpenseService().createExpense(expenseData, trans);
            await trans.commit();
            return loanUpdated;
        }, async () => await trans.rollback())
    }

    private getNewAmorts(newBalance: number, amorts: IAmortization[], loan: ILoan & ILoanRelation) {
        let newAmorts = amortization.getAmortization({
                amount: newBalance,
                term: amorts.length,
                rate: loan.condition.rate,
                startAt: amorts.at(0)?.date,
                period: loan.period
            }
        )
        return newAmorts.map((amort: IAmortization, index: number) => (
            {
                ...amort,
                nro: amorts.at(index)?.nro,
                loanId: loan.id,
                clientId: loan.clientId,
                createdBy: loan.createdBy,
                updatedBy: loan.updatedBy
            }
        ))
    }

    async updateLoan(loanId: string, data: ILoan): Promise<ILoan> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
                const loan = await this.mainRepo.findById(loanId, {include: "amortizations,condition"});
                const oldWallet = await this.walletRepo.findById(loan.walletId);
                const newWallet = await this.walletRepo.findById(data.walletId)
                let newAmorts = amortization.getAmortization(data)
                    .map((amort: {}) => ({
                        ...amort,
                        createdBy: data.updatedBy,
                        updatedBy: data.updatedBy
                    }));
                await this.amortizationRepo.bulkDelete({where: {loanId: loanId}}, true, trans);
                data.endAt = newAmorts.at(-1).date;
                data.startAt = newAmorts.at(0).date;
                data.nextPaymentAt = newAmorts.at(0).date;
                data.balance = data.amount;
                const newLoan = await this.mainRepo.update(data, loanId, trans);
                await this.conditionRepo
                    .update({...data, loanId: newLoan.id}, loan.condition.id, trans);
                if (loan.status === ELoanStatus.Aprobado) {
                    if (loan.lawyerId) {
                        await this.lawyerPaymentRepo.bulkDelete({
                            where: {
                                [Op.and]: [{lawyerId: loan.lawyerId}, {loanId: loan.id}],
                            }
                        }, true, trans)
                        await this.createPaymentForLawyerFromLoan(loan.lawyerId, loan, trans);
                    }
                    if (oldWallet?.id === newWallet?.id) {
                        if (newWallet) {
                            await this.walletRepo.setBalance(loan.amount - data.amount, oldWallet.id, trans);
                        }
                    } else {
                        if (oldWallet) {
                            await this.walletRepo.setBalance(loan.amount, oldWallet.id, trans);
                        }
                        if (newWallet) {
                            await this.walletRepo.setBalance(0 - data.amount, newWallet.id, trans);
                        }
                    }
                }
                await this.amortizationRepo
                    .createFromLoan(newAmorts, newLoan.id!, data.clientId, trans);
                await trans.commit();
                return newLoan;


            },
            async () => await trans.rollback()
        )
    }


    async deleteLoan(loanId: string): Promise<ILoan> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }

    async restoreLoan(loanId: string): Promise<ILoan> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
            },
            async () => await trans.rollback()
        )
    }


}