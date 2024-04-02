import Service from "@app/services/Service";
import {IParams} from "@app/interfaces/AppInterfaces";
import LoanRepository from "@source/repositories/LoanRepository";
import TenantConnection from "@app/db/TenantConnection";
import {
    ELawyerPaymentStatus,
    ELawyerPaymode,
    ELoanStatus,
    ILawyerPayment,
    ILoan
} from "@app/interfaces/SourceInterfaces";
import amortization from "@app/utils/amortization";
import ConditionRepository from "@source/repositories/ConditionRepository";
import AmortizationRepository from "@source/repositories/AmortizationRepository";
import WalletRepository from "@source/repositories/WalletRepository";
import LawyerPaymentRepository from "@source/repositories/LawyerPaymentRepository";
import LawyerRepository from "@source/repositories/LawyerRepository";
import {Transaction} from "sequelize";

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
        if (lawyer.payMode == ELawyerPaymode.Contrato) {
            const newLayerPayment: ILawyerPayment = {
                amount: lawyer.payPrice,
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
                if (data.lawyerId) {
                    await this.createPaymentForLawyerFromLoan(data.lawyerId, loan, trans);
                }
                await this.walletRepo.setBalance((0 - loan.amount), data.walletId, trans);
                await this.mainRepo.update({...data, status: ELoanStatus.Aprobado}, loan.id, trans);
                await trans.commit();
                return loan
            },
            async () => await trans.rollback()
        )
    }

    async updateLoan(loanId: string, data: ILoan): Promise<ILoan> {
        const trans = await TenantConnection.getTrans();
        return this.safeRun(async () => {
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