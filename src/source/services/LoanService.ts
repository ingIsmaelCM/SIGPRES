import { IParams } from "@/app/utils/AppInterfaces";
import LoanRepository from "../repositories/LoanRepository";
import Service from "@/app/services/Service";

export default class LoanService extends Service {
  loanRepo = new LoanRepository();

  async getLoans(params: IParams): Promise<any> {
    return this.safeRun(() => this.loanRepo.getAll(params));
  }
}
