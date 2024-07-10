"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class ClientContactRequest extends BaseRequest_1.default {
    clientContactCreateRequest() {
        return [
            this.RequestCheck.required("clientId"),
            this.RequestCheck.required("contactId"),
            this.RequestCheck.isString("relationship").optional(),
        ];
    }
    clientContactUpdateRequest() {
        return [];
    }
}
exports.default = new ClientContactRequest();
//# sourceMappingURL=ClientContactRequest.js.map