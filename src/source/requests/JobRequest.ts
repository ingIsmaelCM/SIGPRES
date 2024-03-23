import BaseRequest from "@app/requests/BaseRequest";
import {ValidationChain} from "express-validator";

class JobRequest extends BaseRequest {
    jobCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("startAt"),
            this.RequestMessage.isDate("startAt"),
            this.RequestMessage.isDate('endAt').optional(),
            this.RequestMessage.isIn("status", "Actual | Anterior",
                ['Actual', 'Anterior']).optional(),
            this.RequestMessage.required('salary'),
            this.RequestMessage.isFloat('salary', 0, (9 * 100 * 100 * 10)),
            this.RequestMessage.required('position'),
            this.RequestMessage.isLength("position", 5, 50),
            this.RequestMessage.required('company'),
            this.RequestMessage.isLength('company', 2, 75),
            this.RequestMessage.required('clientId')
        ]
    }

    jobUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.isDate("startAt").optional(),
            this.RequestMessage.isDate('endAt').optional(),
            this.RequestMessage.isIn("status", "Actual | Anterior",
                ['Actual', 'Anterior']).optional(),
            this.RequestMessage.isFloat('salary', 0, (9 * 100 * 100 * 10)).optional(),
            this.RequestMessage.isLength("position", 5, 50).optional(),
            this.RequestMessage.isLength('company', 2, 75).optional(),
            this.RequestMessage.isInt('clientId').optional()
        ]
    }

}

export default new JobRequest();