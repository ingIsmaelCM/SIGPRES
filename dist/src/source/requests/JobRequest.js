"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class JobRequest extends BaseRequest_1.default {
    jobCreateRequest() {
        return [
            this.RequestCheck.required("startAt"),
            this.RequestCheck.isDate("startAt"),
            this.RequestCheck.isDate('endAt').optional(),
            this.RequestCheck.isIn("status", "Actual | Anterior", ['Actual', 'Anterior']).optional(),
            this.RequestCheck.required('salary'),
            this.RequestCheck.isFloat('salary', 0, (9 * 100 * 100 * 10)),
            this.RequestCheck.required('position'),
            this.RequestCheck.isLength("position", 5, 50),
            this.RequestCheck.required('company'),
            this.RequestCheck.isLength('company', 2, 75),
            this.RequestCheck.required('clientId')
        ];
    }
    jobUpdateRequest() {
        return [
            this.RequestCheck.isDate("startAt").optional(),
            this.RequestCheck.isDate('endAt').optional({ values: "falsy" }),
            this.RequestCheck.isIn("status", "Actual | Anterior", ['Actual', 'Anterior']).optional(),
            this.RequestCheck.isString("infoId").optional(),
            this.RequestCheck.isFloat('salary', 0, (9 * 100 * 100 * 10)).optional(),
            this.RequestCheck.isLength("position", 5, 50).optional(),
            this.RequestCheck.isLength('company', 2, 75).optional(),
            this.RequestCheck.isString('clientId').optional()
        ];
    }
}
exports.default = new JobRequest();
//# sourceMappingURL=JobRequest.js.map