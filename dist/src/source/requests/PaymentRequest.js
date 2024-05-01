"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class PaymentRequest extends BaseRequest_1.default {
    paymentCreateRequest() {
        return [];
    }
    paymentCreateCuotaRequest() {
        return [
            this.RequestCheck.required("walletId"),
            this.RequestCheck.required("payedAt"),
            this.RequestCheck.isDate("payedAt"),
            this.RequestCheck.required("cuotas"),
            this.RequestCheck.isArray("cuotas"),
            this.RequestCheck.required("omitMora"),
            this.RequestCheck.required("justInterest"),
            this.RequestCheck.isString("note").optional({ values: "falsy" }),
            this.RequestCheck.isString("lawyerId").optional({ values: "falsy" })
        ];
    }
    paymentCreateCapitalRequest() {
        return [
            this.RequestCheck.required("walletId"),
            this.RequestCheck.required("loanId"),
            this.RequestCheck.required("payedAt"),
            this.RequestCheck.isDate("payedAt"),
            this.RequestCheck.required("capital"),
            this.RequestCheck.required("mora"),
            this.RequestCheck.isFloat("capital", 0),
            this.RequestCheck.isFloat("mora", 0),
            this.RequestCheck.required("moveDate"),
            this.RequestCheck.isFloat("interest").optional(),
            this.RequestCheck.isString("note").optional({ values: "falsy" }),
            this.RequestCheck.isString("lawyerId").optional({ values: "falsy" })
        ];
    }
    paymentCreateAboneRequest() {
        return [
            this.RequestCheck.required("walletId"),
            this.RequestCheck.required("loanId"),
            this.RequestCheck.required("payedAt"),
            this.RequestCheck.isDate("payedAt"),
            this.RequestCheck.required("capital"),
            this.RequestCheck.isFloat("capital", 0),
            this.RequestCheck.isFloat("interest", 0).optional(),
            this.RequestCheck.isString("note").optional({ values: "falsy" }),
            this.RequestCheck.isString("lawyerId").optional({ values: "falsy" })
        ];
    }
    paymentUpdateRequest() {
        return [];
    }
}
exports.default = new PaymentRequest();
//# sourceMappingURL=PaymentRequest.js.map