import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class SocialRequest extends BaseRequest {
    socialCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("clientId"),
            this.RequestCheck.isLength("instagram",5,50).optional(),
            this.RequestCheck.isLength("facebook",5,50).optional(),
            this.RequestCheck.isLength("whatsapp",5,50).optional(),
        ]
    }

    socialUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.isInt("clientId").optional(),
            this.RequestCheck.isLength("instagram",5,50).optional(),
            this.RequestCheck.isLength("facebook",5,50).optional(),
            this.RequestCheck.isLength("whatsapp",5,50).optional(),
        ]
    }

}

export default new SocialRequest();