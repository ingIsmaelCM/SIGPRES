import { BaseRepository } from "@/app/repositories/BaseRepository";
import { Loan } from "../models";

export default class LoanRepository extends BaseRepository<Loan> {
  constructor() {
    super(Loan);
  }

  public async create(data: any, trans: any): Promise<Loan> {
    return await super.create(data, trans);
  }
}
