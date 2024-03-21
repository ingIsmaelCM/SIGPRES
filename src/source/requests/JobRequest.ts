import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";

class JobRequest extends BaseRequest {
    jobCreateRequest(): Array<ValidationChain> {
        return []
    }

    jobUpdateRequest(): Array<ValidationChain> {
        return []
    }

}

export default new JobRequest();