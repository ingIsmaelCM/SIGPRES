"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class CardRequest extends BaseRequest_1.default {
    cardCreateRequest() {
        return [
            this.RequestCheck.required("clientId"),
            this.RequestCheck.required("value"),
            this.RequestCheck.required("ending"),
            this.RequestCheck.required("brand"),
            this.RequestCheck.required("holdname"),
        ];
    }
    cardUpdateRequest() {
        return [];
    }
}
exports.default = new CardRequest();
//# sourceMappingURL=CardRequest.js.map