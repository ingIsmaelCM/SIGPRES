import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class ExpenseRequest extends BaseRequest {
    expenseCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("amount"),
            this.RequestCheck.isFloat("amount",1, 9*1000*1000),
            this.RequestCheck.required("date"),
            this.RequestCheck.isDate("date"),
            this.RequestCheck.required("concepto"),
            this.RequestCheck.isLength("concepto",5,125),
            this.RequestCheck.required("walletId"),
            this.RequestCheck.isString("lawyerId").optional({values: "falsy"}),

        ]
    }

    expenseUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.isFloat("amount",1, 9*1000*1000).optional({values: "falsy"}),
            this.RequestCheck.isDate("date").optional({values: "falsy"}),
            this.RequestCheck.isLength("concepto",5,125).optional({values: "falsy"}),
            this.RequestCheck.isString("walletId").optional({values: "falsy"}),
            this.RequestCheck.isString("lawyerId").optional({values: "falsy"}),
        ]
    }

}

export default new ExpenseRequest();