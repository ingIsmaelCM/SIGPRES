"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class WalletRequest extends BaseRequest_1.default {
    walletCreateRequest() {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.required("balance"),
            this.RequestCheck.isLength("sumBalance", 0, 20).optional(),
            this.RequestCheck.isString("authId").optional({ values: "falsy" }),
        ];
    }
    walletUpdateRequest() {
        return [
            this.RequestCheck.isString("name").optional({ values: "falsy" }),
            this.RequestCheck.isString("authId").optional({ values: "falsy" }),
        ];
    }
}
exports.default = new WalletRequest();
//# sourceMappingURL=WalletRequest.js.map