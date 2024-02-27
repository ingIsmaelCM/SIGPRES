import { BaseRepository } from "@/app/repositories/BaseRepository";
import Expense from "@source/models/Expense";

export default class ExpenseRepository extends BaseRepository<Expense> {
  constructor() {
    super(Expense);
  }
}
