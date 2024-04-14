import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class LoanRequest extends BaseRequest {
    loanCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("amount"),
            this.RequestCheck.isFloat("amount",100, 900*1000),
            this.RequestCheck.required('startAt'),
            this.RequestCheck.required('term'),
            this.RequestCheck.required("type"),
            this.RequestCheck.required('period'),
            this.RequestCheck.required('clientId'),
            this.RequestCheck.isString('lawyerId').optional({values: "falsy"}),
            this.RequestCheck.isString('guarantorId').optional({values: "falsy"}),
        ]
    }

    loanUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("amount"),
            this.RequestCheck.isFloat("amount",100, 900*1000),
            this.RequestCheck.required('startAt'),
            this.RequestCheck.required('term'),
            this.RequestCheck.required("type"),
            this.RequestCheck.required('period'),
            this.RequestCheck.required('clientId'),
            this.RequestCheck.isString('lawyerId').optional({values: "falsy"}),
            this.RequestCheck.isString('guarantorId').optional({values: "falsy"}),
            this.RequestCheck.isString('walletId').optional({values: "falsy"}),
        ]
    }

    loanConfirmRequest():Array<ValidationChain>{
        return [
            this.RequestCheck.required("walletId"),
            this.RequestCheck.required("startAt")
        ]
    }

}

export default new LoanRequest();