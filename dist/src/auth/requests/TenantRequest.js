"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const express_validator_1 = require("express-validator");
class TenantRequest extends BaseRequest_1.default {
    createTenantRequest() {
        return [
            (0, express_validator_1.body)("name", "Indique el nombre del Inquilino").exists().notEmpty(),
        ];
    }
    updateTenantRequest() {
        return [
            (0, express_validator_1.body)("name", "Indique el nombre del Inquilino").exists().notEmpty(),
        ];
    }
    assignTenantRequest() {
        return [
            this.RequestCheck.required("authIds"),
            (0, express_validator_1.body)("authIds", "Indique al menos un usuario")
                .isArray({ min: 1, max: 100 })
        ];
    }
    switchTenantRequest() {
        return [
            this.RequestCheck.required("tenant"),
            (0, express_validator_1.body)("tenant", "Este inquilino no es válido").custom((value, meta) => {
                const tenants = meta.req.auth.tenants;
                return !(!tenants || !tenants.some((tenant) => tenant.key === value));
            })
        ];
    }
}
exports.default = new TenantRequest();
//# sourceMappingURL=TenantRequest.js.map