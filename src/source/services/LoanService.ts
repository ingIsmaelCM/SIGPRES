import { IParams } from "@/app/utils/AppInterfaces";
import LoanRepository from "../repositories/LoanRepository";
import Service from "@/app/services/Service";
import {
  EAmortizationStatus,
  ICondition,
  ILoan,
} from "../utils/SourceInterfaces";
import TenantConnection from "@/app/db/TenantConnection";
import amortization from "@/app/utils/amortization";
import AmortizationRepository from "../repositories/AmortizationRepository";
import { Loan } from "../models";
import ConditionRepository from "../repositories/ConditionRepository";
import { Transaction } from "sequelize";
import WalletRepository from "@source/repositories/WalletRepository";

export default class LoanService extends Service {
  private loanRepo = new LoanRepository();
  private amortRepo = new AmortizationRepository();
  private conditionRepo = new ConditionRepository();
  protected  walletRepo= new WalletRepository();

  async getLoans(params: IParams): Promise<any> {
    return this.safeRun(() => this.loanRepo.getAll(params));
  }

  async createLoan(data: ILoan & ICondition): Promise<any> {
    const trans = await TenantConnection.getTrans();


    return this.safeRun(
      async () => {
        let amorts = amortization.getAmortization(data);
        const endAt = amorts.at(-1).date.split("/").reverse().join("-");
        data.balance = data.amount;
        data.endAt = endAt;
        data.nextPaymentAt = amorts.at(0).date.split("/").reverse().join("-");
        const loan = await this.loanRepo.create(data, trans);
        await this.setAmortizations(amorts, loan, trans);
        await this.setCondition(data, loan, trans);

        await trans.commit();
        return loan;
      },
      async () => {
        await trans.rollback();
      }
    );
  }
  async  reduceWalletBalance(loan: Loan, trans: Transaction) {
    const wallet = await this.walletRepo.findById(loan.walletId);
    const newBalance = Number(wallet.balance) - Number(loan.amount);
    await this.walletRepo.update({balance: newBalance}, wallet.id, trans);
  }


  private async setCondition(data: any, loan: Loan, trans: Transaction) {
    const condition: ICondition = {
      initTerm: data.initTerm,
      initRateMora: data.initRateMora,
      finalRateMora: data.finalRateMora,
      grace: data.grace,
      rate: data.rate,
      loanId: loan.id!,
      clientId: data.clientId,
      createdBy: loan.createdBy,
      updatedBy: loan.updatedBy,
    };
    await this.conditionRepo.create(condition, trans);
  }

  private async setAmortizations(amorts: any, loan: Loan, trans: Transaction) {
    amorts = amorts.map((amort: any) => ({
      ...amort,
      loanId: loan.id,
      date: amort.date.split("/").reverse().join("-"),
      clientId: loan.clientId,
      status: EAmortizationStatus.Pendiente,
      createdBy: loan.createdBy,
      updatedBy: loan.updatedBy,
    }));
    await this.amortRepo.bulkCreate(amorts, trans);
    return amorts;
  }
}
