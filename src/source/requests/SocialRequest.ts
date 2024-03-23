import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class SocialRequest extends BaseRequest {
    socialCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("clientId"),
            this.RequestMessage.isLength("instagram",5,50).optional(),
            this.RequestMessage.isLength("facebook",5,50).optional(),
            this.RequestMessage.isLength("whatsapp",5,50).optional(),
        ]
    }

    socialUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.isInt("clientId").optional(),
            this.RequestMessage.isLength("instagram",5,50).optional(),
            this.RequestMessage.isLength("facebook",5,50).optional(),
            this.RequestMessage.isLength("whatsapp",5,50).optional(),
        ]
    }

}

export default new SocialRequest();