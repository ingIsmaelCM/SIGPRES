import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";
import {EAttributeType} from "@app/interfaces/SourceInterfaces";

class AttributeRequest extends BaseRequest {
    guaranteeAttributeCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required('name'),
            this.RequestCheck.required("type"),
            this.RequestCheck.isIn('type', Object.values(EAttributeType).join('|'),
                Object.values(EAttributeType)),
            this.RequestCheck.isArray("options",{max:5}).optional({values: "falsy"}),
            this.RequestCheck.isLength('options',0,250)
        ]
    }

    guaranteeAttributeUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new AttributeRequest();