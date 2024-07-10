"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class WhatsappRequest extends BaseRequest_1.default {
    textMessageRequest() {
        return [
            this.RequestCheck.required("text"),
            this.RequestCheck.required("to")
        ];
    }
    imageMesageRequest() {
        return [
            this.RequestCheck.required("image"),
            this.RequestCheck.required("to")
        ];
    }
}
exports.default = new WhatsappRequest();
//# sourceMappingURL=WhatsappRequest.js.map