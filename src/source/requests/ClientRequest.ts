import BaseRequest from "@app/requests/BaseRequest";
import {ValidationChain} from "express-validator";
import {EClientType} from "@app/interfaces/SourceInterfaces";

class ClientRequest extends BaseRequest {
    clientCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("name"),
            this.RequestMessage.isLength("name",0,50),
            this.RequestMessage.required("lastname"),
            this.RequestMessage.isLength("lastname",0,50),
            this.RequestMessage.isIn("clienttype",`${EClientType.Persona} | ${EClientType.Negocio}`,
                [EClientType.Persona, EClientType.Negocio]).optional(),

        ]
    }

    clientUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.isLength("name",2,50).optional(),
            this.RequestMessage.isLength("lastname",2,50).optional(),
            this.RequestMessage.isInt("infoId").optional(),
            this.RequestMessage.isIn("clienttype",`${EClientType.Persona} | ${EClientType.Negocio}`,
                [EClientType.Persona, EClientType.Negocio]).optional(),
        ]
    }
}

export default new ClientRequest();