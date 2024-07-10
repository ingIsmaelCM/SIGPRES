"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class ExpenseRequest extends BaseRequest_1.default {
    expenseCreateRequest() {
        return [
            this.RequestCheck.required("amount"),
            this.RequestCheck.isFloat("amount", 1, 9 * 1000 * 1000),
            this.RequestCheck.required("date"),
            this.RequestCheck.isDate("date"),
            this.RequestCheck.required("concepto"),
            this.RequestCheck.isLength("concepto", 5, 125),
            this.RequestCheck.required("walletId"),
            this.RequestCheck.isString("lawyerId").optional({ values: "falsy" }),
        ];
    }
    expenseCreateFromLawyerRequest() {
        return [
            this.RequestCheck.required("lawyerPaymentIds"),
            this.RequestCheck.isArray("lawyerPaymentIds", { min: 1, max: 15 }),
        ];
    }
    expenseUpdateRequest() {
        return [
            this.RequestCheck.isFloat("amount", 1, 9 * 1000 * 1000).optional({ values: "falsy" }),
            this.RequestCheck.isDate("date").optional({ values: "falsy" }),
            this.RequestCheck.isLength("concepto", 5, 125).optional({ values: "falsy" }),
            this.RequestCheck.isString("walletId").optional({ values: "falsy" }),
            this.RequestCheck.isString("lawyerId").optional({ values: "falsy" }),
        ];
    }
}
exports.default = new ExpenseRequest();
//# sourceMappingURL=ExpenseRequest.js.map