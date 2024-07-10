"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class MoraRequest extends BaseRequest_1.default {
    moraCreateRequest() {
        return [];
    }
    moraUpdateRequest() {
        return [];
    }
}
exports.default = new MoraRequest();
//# sourceMappingURL=MoraRequest.js.map