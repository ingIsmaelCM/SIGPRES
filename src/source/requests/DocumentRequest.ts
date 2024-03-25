import BaseRequest from "@app/requests/BaseRequest";
import {body, param, ValidationChain} from "express-validator"

class DocumentRequest extends BaseRequest {

    documentCreateRequest(): Array<ValidationChain> {
        return [
            ...this.requireIdRequest(),
        ];
    }
    documentUpdateRequest(): Array<ValidationChain> {
        return [
            ...this.requireIdRequest(),
        ];
    }
}

export default new DocumentRequest();