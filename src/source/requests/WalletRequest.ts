import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class WalletRequest extends BaseRequest {
    walletCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.required("balance"),
            this.RequestCheck.isLength("sumBalance", 0, 20).optional(),
            this.RequestCheck.isString("authId").optional({values: "falsy"}),
        ]
    }

    walletUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.isString("name").optional({values: "falsy"}),
            this.RequestCheck.isString("authId").optional({values: "falsy"}),
        ]
    }

    walletAddBalanceRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("newBalance"),
            this.RequestCheck.isFloat("newBalance", 1, 9 * 100 * 100),
            this.RequestCheck.isLength("sumBalance", 0, 20).optional(),
        ]
    }

}

export default new WalletRequest();