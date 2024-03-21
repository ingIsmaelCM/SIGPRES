import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class WalletRequest extends BaseRequest {
    walletCreateRequest(): Array<ValidationChain> {
        return []
    }

    walletUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new WalletRequest();