import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class PreferenceRequest extends BaseRequest {
    preferenceCreateRequest(): Array<ValidationChain> {
        return []
    }

    preferenceUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new PreferenceRequest();