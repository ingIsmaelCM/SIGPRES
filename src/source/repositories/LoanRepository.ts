import { BaseRepository } from "@/app/repositories/BaseRepository";
import { Loan } from "@source/models";

export default class LoanRepository extends BaseRepository<Loan> {
  constructor() {
    super(Loan);
  }


}
