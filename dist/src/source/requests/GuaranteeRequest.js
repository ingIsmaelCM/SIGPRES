"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
class GuaranteeRequest extends BaseRequest_1.default {
    guaranteeCreateRequest() {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.required("value"),
            this.RequestCheck.isFloat("value", 0, 9 * 1000 * 1000),
            this.RequestCheck.required('status'),
            this.RequestCheck.isIn("status", Object.values(SourceInterfaces_1.EGuaranteeStatus).join(', '), Object.values(SourceInterfaces_1.EGuaranteeStatus)),
            this.RequestCheck.required("attributes"),
            this.RequestCheck.required("loanId"),
            this.RequestCheck.required("clientId"),
        ];
    }
    guaranteeUpdateRequest() {
        return [];
    }
}
exports.default = new GuaranteeRequest();
//# sourceMappingURL=GuaranteeRequest.js.map