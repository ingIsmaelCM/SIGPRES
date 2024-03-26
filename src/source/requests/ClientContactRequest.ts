import BaseRequest from "@app/requests/BaseRequest";
import {ValidationChain} from "express-validator";

class ClientContactRequest extends BaseRequest {
    clientContactCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("clientId"),
            this.RequestCheck.required("contactId"),
            this.RequestCheck.isString("relationship").optional(),
        ]
    }

    clientContactUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new ClientContactRequest();