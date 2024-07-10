"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const express_validator_1 = require("express-validator");
class PreferenceRequest extends BaseRequest_1.default {
    preferenceCreateRequest() {
        return [];
    }
    preferenceUpdateRequest() {
        return [
            (0, express_validator_1.param)("key", "Se requiere la clave de preferencia").exists().notEmpty(),
            this.RequestCheck.required("value"),
            this.RequestCheck.isString("value")
        ];
    }
}
exports.default = new PreferenceRequest();
//# sourceMappingURL=PreferenceRequest.js.map