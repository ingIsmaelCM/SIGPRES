import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class CardRequest extends BaseRequest {
    cardCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("clientId"),
            this.RequestCheck.required("value"),
            this.RequestCheck.required("ending"),
            this.RequestCheck.required("brand"),
            this.RequestCheck.required("holdname"),
        ]
    }

    cardUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new CardRequest();