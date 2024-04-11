import BaseRequest from "@app/requests/BaseRequest";
import {ValidationChain} from "express-validator";

class  WhatsappRequest extends  BaseRequest{

    textMessageRequest(): Array<ValidationChain>{
        return [
            this.RequestCheck.required("text"),
            this.RequestCheck.required("to")
        ]
    }
}

export  default  new WhatsappRequest();