import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class ExpenseRequest extends BaseRequest {
    expenseCreateRequest(): Array<ValidationChain> {
        return []
    }

    expenseUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new ExpenseRequest();