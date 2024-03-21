import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class ContactRequest extends BaseRequest {
    contactCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("name"),
            this.RequestMessage.isLength("name",0,50),
            this.RequestMessage.required("lastname"),
            this.RequestMessage.isLength("lastname",0,50),
            this.RequestMessage.isInt("clientId").optional(),
        ]
    }

    contactUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.isLength("name",0,50),
            this.RequestMessage.isLength("lastname",0,50),
        ]
    }

}

export default new ContactRequest();