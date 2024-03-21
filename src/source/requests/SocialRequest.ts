import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class SocialRequest extends BaseRequest {
    socialCreateRequest(): Array<ValidationChain> {
        return []
    }

    socialUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new SocialRequest();