"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class AmortizationRequest extends BaseRequest_1.default {
    amortizationCreateRequest() {
        return [];
    }
    amortizationUpdateRequest() {
        return [];
    }
}
exports.default = new AmortizationRequest();
//# sourceMappingURL=AmortizationRequest.js.map