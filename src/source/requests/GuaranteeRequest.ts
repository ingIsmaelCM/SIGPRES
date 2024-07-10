import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";
import {EGuaranteeStatus} from "@app/interfaces/SourceInterfaces";

class GuaranteeRequest extends BaseRequest {
    guaranteeCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.required("value"),
            this.RequestCheck.isFloat("value", 0, 9 * 1000 * 1000),
            this.RequestCheck.required('status'),
            this.RequestCheck.isIn("status", Object.values(EGuaranteeStatus).join(', '),
                Object.values(EGuaranteeStatus)),
            this.RequestCheck.required("attributes"),
            this.RequestCheck.required("loanId"),
            this.RequestCheck.required("clientId"),
        ]
    }

    guaranteeUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new GuaranteeRequest();