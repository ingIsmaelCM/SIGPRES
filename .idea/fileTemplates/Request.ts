import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

 class ${MODEL_NAME}Request extends BaseRequest {
     ${MODEL_NAME_LOWER}CreateRequest(): Array<ValidationChain> {
        return [

        ]
    }
    
    ${MODEL_NAME_LOWER}UpdateRequest(): Array<ValidationChain> {
        return [

        ]
    }

}

export default new ${MODEL_NAME}Request();