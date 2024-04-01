import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class PaymentRequest extends BaseRequest {
    paymentCreateRequest(): Array<ValidationChain> {
        return []
    }

    paymentCreateCuotaRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("walletId"),
            this.RequestCheck.required("payedAt"),
            this.RequestCheck.required("cuotas"),
            this.RequestCheck.isArray("cuotas"),
            this.RequestCheck.required("omitMora"),
            this.RequestCheck.isString("note").optional().optional({values: "falsy"}),
            this.RequestCheck.isInt("lawyerId").optional()

        ]
    }

    paymentCreateCapitalRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("walletId"),
            this.RequestCheck.required("loanId"),
            this.RequestCheck.required("payedAt"),
            this.RequestCheck.required("capital"),
            this.RequestCheck.isFloat("capital",100),
            this.RequestCheck.isFloat("interest").optional(),
            this.RequestCheck.required("keep"),
            this.RequestCheck.isIn("keep","dates|cuotas",["dates","cuotas"]),
            this.RequestCheck.isString("note").optional({values: "falsy"}),
            this.RequestCheck.isInt("lawyerId").optional()
        ]
    }

    paymentUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new PaymentRequest();