import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class ContactRequest extends BaseRequest {
    contactCreateRequest(): Array<ValidationChain> {
        return []
    }

    contactUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new ContactRequest();