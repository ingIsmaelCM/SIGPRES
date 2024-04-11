"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
class ClientRequest extends BaseRequest_1.default {
    clientCreateRequest() {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.isLength("name", 0, 50),
            this.RequestCheck.required("lastname"),
            this.RequestCheck.isLength("lastname", 0, 50),
            this.RequestCheck.isIn("clienttype", `${SourceInterfaces_1.EClientType.Persona} | ${SourceInterfaces_1.EClientType.Negocio}`, [SourceInterfaces_1.EClientType.Persona, SourceInterfaces_1.EClientType.Negocio]).optional(),
        ];
    }
    clientUpdateRequest() {
        return [
            this.RequestCheck.isLength("name", 2, 50).optional(),
            this.RequestCheck.isLength("lastname", 2, 50).optional(),
            this.RequestCheck.isString("infoId").optional(),
            this.RequestCheck.isIn("clienttype", `${SourceInterfaces_1.EClientType.Persona} | ${SourceInterfaces_1.EClientType.Negocio}`, [SourceInterfaces_1.EClientType.Persona, SourceInterfaces_1.EClientType.Negocio]).optional(),
        ];
    }
}
exports.default = new ClientRequest();
//# sourceMappingURL=ClientRequest.js.map