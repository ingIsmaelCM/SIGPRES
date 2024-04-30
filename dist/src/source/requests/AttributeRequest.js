"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
class AttributeRequest extends BaseRequest_1.default {
    guaranteeAttributeCreateRequest() {
        return [
            this.RequestCheck.required('name'),
            this.RequestCheck.required("type"),
            this.RequestCheck.isIn('type', Object.values(SourceInterfaces_1.EAttributeType).join('|'), Object.values(SourceInterfaces_1.EAttributeType)),
            this.RequestCheck.isArray("options", { max: 5 }).optional({ values: "falsy" }),
            this.RequestCheck.isLength('options', 0, 250)
        ];
    }
    guaranteeAttributeUpdateRequest() {
        return [];
    }
}
exports.default = new AttributeRequest();
//# sourceMappingURL=AttributeRequest.js.map