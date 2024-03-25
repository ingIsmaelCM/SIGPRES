import BaseRequest from "@app/requests/BaseRequest";
import {ValidationChain} from "express-validator";

class ImageRequest extends BaseRequest {
    imageSingleCreateRequest(): Array<ValidationChain> {
        return [
            ...this.requireIdRequest(),
        ];
    }
    imageSBulkCreateRequest(): Array<ValidationChain> {
        return [
            ...this.requireIdRequest(),

        ];
    }
    imageUpdateRequest(): Array<ValidationChain> {
        return [

        ];
    }
}

export default new ImageRequest();
