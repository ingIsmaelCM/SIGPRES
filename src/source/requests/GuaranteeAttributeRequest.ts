import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class GuaranteeAttributeRequest extends BaseRequest {
    guaranteeAttributeCreateRequest(): Array<ValidationChain> {
        return []
    }

    guaranteeAttributeUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new GuaranteeAttributeRequest();