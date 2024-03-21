import BaseRequest from "@app/requests/BaseRequest";
import {ValidationChain, body, param} from "express-validator";

class ImageRequest extends BaseRequest {
    imageSingleCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("path"),
            this.RequestMessage.isUrl("path"),
            this.RequestMessage.required("caption"),
            this.RequestMessage.isLength("caption",2,50),
            this.RequestMessage.required("size"),
            this.RequestMessage.isFloat("size", 0.1, 5.5),
        ];
    }
    imageSBulkCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("images"),
            this.RequestMessage.isArray("images"),
            this.RequestMessage.isLength("images",1,5),
            this.RequestMessage.required("images.*.path"),
            this.RequestMessage.isUrl("images.*.path"),
            this.RequestMessage.required("images.*.caption"),
            this.RequestMessage.isString("images.*.caption"),
            this.RequestMessage.isLength("images.*.caption",2,50),
            this.RequestMessage.required("images.*.size"),
            this.RequestMessage.isFloat("images.*.size", 0.1, 5.5),
        ];
    }
    imageUpdateRequest(): Array<ValidationChain> {
        return [

        ];
    }
}

export default new ImageRequest();
