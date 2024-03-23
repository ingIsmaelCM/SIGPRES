import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";
import {EClientContactRelationship} from "@app/interfaces/SourceInterfaces";

class ContactRequest extends BaseRequest {
    contactCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("name"),
            this.RequestMessage.isLength("name",0,50),
            this.RequestMessage.required("lastname"),
            this.RequestMessage.isLength("lastname",0,50),
            this.RequestMessage.isInt("clientId").optional(),
            this.RequestMessage.isInt("relationId").optional(),
            this.RequestMessage.isIn("relationship",
                Object.values(EClientContactRelationship).join(" | "),
                Object.values(EClientContactRelationship)).optional()
        ]
    }

    contactUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.isLength("name",0,50),
            this.RequestMessage.isLength("lastname",0,50),
            this.RequestMessage.isInt("relationId").optional(),
            this.RequestMessage.isInt("infoId").optional(),
            this.RequestMessage.isIn("relationship",
                Object.values(EClientContactRelationship).join(" | "),
                Object.values(EClientContactRelationship)).optional()
        ]
    }

}

export default new ContactRequest();