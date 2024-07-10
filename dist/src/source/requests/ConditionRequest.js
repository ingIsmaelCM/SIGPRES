"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class ConditionRequest extends BaseRequest_1.default {
    conditionCreateRequest() {
        return [
            this.RequestCheck.required('initTerm'),
            this.RequestCheck.isFloat('initTerm', 0, 30),
            this.RequestCheck.required('initRateMora'),
            this.RequestCheck.isFloat('initRateMora', 0, 100),
            this.RequestCheck.required('finalRateMora'),
            this.RequestCheck.isFloat('finalRateMora', 0, 100),
            this.RequestCheck.required('grace'),
            this.RequestCheck.isFloat('grace', 0, 30),
            this.RequestCheck.required('rate'),
            this.RequestCheck.isFloat('rate', 0, 100),
        ];
    }
    conditionUpdateRequest() {
        return [];
    }
}
exports.default = new ConditionRequest();
//# sourceMappingURL=ConditionRequest.js.map