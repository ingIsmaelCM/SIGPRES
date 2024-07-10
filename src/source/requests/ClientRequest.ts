import BaseRequest from "@app/requests/BaseRequest";
import {ValidationChain} from "express-validator";
import {EClientType} from "@app/interfaces/SourceInterfaces";

class ClientRequest extends BaseRequest {
    clientCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.isLength("name",0,50),
            this.RequestCheck.required("lastname"),
            this.RequestCheck.isLength("lastname",0,50),
            this.RequestCheck.isIn("clienttype",`${EClientType.Persona} | ${EClientType.Negocio}`,
                [EClientType.Persona, EClientType.Negocio]).optional(),

        ]
    }

    clientUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.isLength("name",2,50).optional(),
            this.RequestCheck.isLength("lastname",2,50).optional(),
            this.RequestCheck.isString("infoId").optional(),
            this.RequestCheck.isIn("clienttype",`${EClientType.Persona} | ${EClientType.Negocio}`,
                [EClientType.Persona, EClientType.Negocio]).optional(),
        ]
    }
}

export default new ClientRequest();