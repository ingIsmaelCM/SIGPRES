"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const express_validator_1 = require("express-validator");
class PreferenceRequest extends BaseRequest_1.default {
    getPreferenceRequest() {
        return [
            (0, express_validator_1.param)("key", "Debe indicar la clave de la preferencia")
                .exists()
                .notEmpty(),
        ];
    }
    setPreferenceRequest() {
        return [
            (0, express_validator_1.param)("key", "Debe indicar la clave de la preferencia")
                .exists()
                .notEmpty(),
            (0, express_validator_1.body)("value", "Debe indicar el valor de la preferencia")
                .exists()
                .notEmpty(),
        ];
    }
}
exports.default = new PreferenceRequest();
//# sourceMappingURL=PreferenceRequest.js.map