import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class MoraRequest extends BaseRequest {
    moraCreateRequest(): Array<ValidationChain> {
        return []
    }

    moraUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new MoraRequest();