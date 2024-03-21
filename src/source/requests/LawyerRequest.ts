import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class LawyerRequest extends BaseRequest {
    lawyerCreateRequest(): Array<ValidationChain> {
        return []
    }

    lawyerUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new LawyerRequest();