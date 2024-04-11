"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class LoanRequest extends BaseRequest_1.default {
    loanCreateRequest() {
        return [
            this.RequestCheck.required("amount"),
            this.RequestCheck.isFloat("amount", 100, 900 * 1000),
            this.RequestCheck.required('startAt'),
            this.RequestCheck.required('term'),
            this.RequestCheck.required('period'),
            this.RequestCheck.required('clientId'),
            this.RequestCheck.isString('lawyerId').optional(),
            this.RequestCheck.isString('guarantorId').optional(),
        ];
    }
    loanUpdateRequest() {
        return [];
    }
    loanConfirmRequest() {
        return [
            this.RequestCheck.required("walletId"),
            this.RequestCheck.required("startAt")
        ];
    }
}
exports.default = new LoanRequest();
//# sourceMappingURL=LoanRequest.js.map