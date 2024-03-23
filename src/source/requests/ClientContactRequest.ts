import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class ClientContactRequest extends BaseRequest {
    clientContactCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("clientId"),
            this.RequestMessage.required("contactId"),
        ]
    }

    clientContactUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new ClientContactRequest();