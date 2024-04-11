"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const Expense_1 = __importDefault(require("@source/models/Expense"));
class ExpenseRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Expense_1.default);
    }
}
exports.default = ExpenseRepository;
//# sourceMappingURL=ExpenseRepository.js.map