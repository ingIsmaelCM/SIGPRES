import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class ConditionRequest extends BaseRequest {
    conditionCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required('initTerm'),
            this.RequestCheck.isFloat('initTerm', 0,30),
            this.RequestCheck.required('initRateMora'),
            this.RequestCheck.isFloat('initRateMora', 0,100),
            this.RequestCheck.required('finalRateMora'),
            this.RequestCheck.isFloat('finalRateMora', 0,100),
            this.RequestCheck.required('grace'),
            this.RequestCheck.isFloat('grace', 0,30),
            this.RequestCheck.required('rate'),
            this.RequestCheck.isFloat('rate', 0,100),
        ]
    }

    conditionUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new ConditionRequest();