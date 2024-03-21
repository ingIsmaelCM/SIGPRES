import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class PaymentRequest extends BaseRequest {
    paymentCreateRequest(): Array<ValidationChain> {
        return []
    }

    paymentUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new PaymentRequest();