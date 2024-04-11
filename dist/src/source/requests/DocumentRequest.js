"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class DocumentRequest extends BaseRequest_1.default {
    documentCreateRequest() {
        return [
            ...this.requireIdRequest(),
        ];
    }
    documentUpdateRequest() {
        return [
            ...this.requireIdRequest(),
        ];
    }
}
exports.default = new DocumentRequest();
//# sourceMappingURL=DocumentRequest.js.map