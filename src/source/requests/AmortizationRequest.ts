import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class AmortizationRequest extends BaseRequest {
    amortizationCreateRequest(): Array<ValidationChain> {
        return []
    }

    amortizationUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new AmortizationRequest();