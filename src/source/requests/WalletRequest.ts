import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class WalletRequest extends BaseRequest {
    walletCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.required("balance"),
            this.RequestCheck.isLength("sumBalance",0, 20).optional(),
        ]
    }

    walletUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.isString("name").optional({values: "falsy"}),
        ]
    }

}

export default new WalletRequest();