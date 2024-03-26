import BaseRequest from "@app/requests/BaseRequest";
import {param, ValidationChain} from "express-validator";

class PreferenceRequest extends BaseRequest {
    preferenceCreateRequest(): Array<ValidationChain> {
        return []
    }

    preferenceUpdateRequest(): Array<ValidationChain> {
        return [
            param("key", "Se requiere la clave de preferencia").exists().notEmpty(),
            this.RequestCheck.required("value"),
            this.RequestCheck.isString("value")
        ]
    }

}

export default new PreferenceRequest();