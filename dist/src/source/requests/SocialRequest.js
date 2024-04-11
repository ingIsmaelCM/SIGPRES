"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class SocialRequest extends BaseRequest_1.default {
    socialCreateRequest() {
        return [
            this.RequestCheck.required("clientId"),
            this.RequestCheck.isLength("instagram", 5, 50).optional(),
            this.RequestCheck.isLength("facebook", 5, 50).optional(),
            this.RequestCheck.isLength("whatsapp", 5, 50).optional(),
        ];
    }
    socialUpdateRequest() {
        return [
            this.RequestCheck.isString("clientId").optional(),
            this.RequestCheck.isLength("instagram", 5, 50).optional(),
            this.RequestCheck.isLength("facebook", 5, 50).optional(),
            this.RequestCheck.isLength("whatsapp", 5, 50).optional(),
        ];
    }
}
exports.default = new SocialRequest();
//# sourceMappingURL=SocialRequest.js.map