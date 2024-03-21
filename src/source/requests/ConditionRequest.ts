import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class ConditionRequest extends BaseRequest {
    conditionCreateRequest(): Array<ValidationChain> {
        return []
    }

    conditionUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new ConditionRequest();