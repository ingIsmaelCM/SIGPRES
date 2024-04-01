import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class LawyerPaymentRequest extends BaseRequest {
    lawyerPaymentCreateRequest(): Array<ValidationChain> {
        return []
    }

    lawyerPaymentUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new LawyerPaymentRequest();