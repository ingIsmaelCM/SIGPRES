"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
class AttributeRequest extends BaseRequest_1.default {
    guaranteeAttributeCreateRequest() {
        return [];
    }
    guaranteeAttributeUpdateRequest() {
        return [];
    }
}
exports.default = new AttributeRequest();
//# sourceMappingURL=AttributeRequest.js.map