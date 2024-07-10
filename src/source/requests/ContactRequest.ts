import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";
import {EClientContactRelationship} from "@app/interfaces/SourceInterfaces";

class ContactRequest extends BaseRequest {
    contactCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.isLength("name",0,50),
            this.RequestCheck.required("lastname"),
            this.RequestCheck.isLength("lastname",0,50),
            this.RequestCheck.isString("clientId").optional(),
            this.RequestCheck.isString("relationId").optional(),
            this.RequestCheck.isIn("relationship",
                Object.values(EClientContactRelationship).join(" | "),
                Object.values(EClientContactRelationship)).optional()
        ]
    }

    contactUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.isLength("name",0,50),
            this.RequestCheck.isLength("lastname",0,50),
            this.RequestCheck.isString("relationId").optional(),
            this.RequestCheck.isString("infoId").optional(),
            this.RequestCheck.isIn("relationship",
                Object.values(EClientContactRelationship).join(" | "),
                Object.values(EClientContactRelationship)).optional()
        ]
    }

}

export default new ContactRequest();