"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
class ContactRequest extends BaseRequest_1.default {
    contactCreateRequest() {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.isLength("name", 0, 50),
            this.RequestCheck.required("lastname"),
            this.RequestCheck.isLength("lastname", 0, 50),
            this.RequestCheck.isString("clientId").optional(),
            this.RequestCheck.isString("relationId").optional(),
            this.RequestCheck.isIn("relationship", Object.values(SourceInterfaces_1.EClientContactRelationship).join(" | "), Object.values(SourceInterfaces_1.EClientContactRelationship)).optional()
        ];
    }
    contactUpdateRequest() {
        return [
            this.RequestCheck.isLength("name", 0, 50),
            this.RequestCheck.isLength("lastname", 0, 50),
            this.RequestCheck.isString("relationId").optional(),
            this.RequestCheck.isString("infoId").optional(),
            this.RequestCheck.isIn("relationship", Object.values(SourceInterfaces_1.EClientContactRelationship).join(" | "), Object.values(SourceInterfaces_1.EClientContactRelationship)).optional()
        ];
    }
}
exports.default = new ContactRequest();
//# sourceMappingURL=ContactRequest.js.map