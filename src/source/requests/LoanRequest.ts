import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class LoanRequest extends BaseRequest {
    loanCreateRequest(): Array<ValidationChain> {
        return []
    }

    loanUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new LoanRequest();