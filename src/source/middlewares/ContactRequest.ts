import BaseRequest from "@app/middlewares/BaseRequest";
import {ValidationChain, body} from "express-validator"
import ClientRequest from "@source/middlewares/ClientRequest";
class ContactRequest extends  BaseRequest{

    upsertContactRequest(): Array<ValidationChain>{
        return [
            ...ClientRequest.upsertClientRequest(),
            body("clientId", "El id de cliente no es válido").optional().isInt()
        ]
    }
}

export default  new ContactRequest();