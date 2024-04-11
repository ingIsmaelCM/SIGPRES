"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const express_validator_1 = require("express-validator");
class RoleRequests extends BaseRequest_1.default {
    validateCreateRole() {
        return [(0, express_validator_1.body)("name", "Falta el nombre del rol").notEmpty().isString()];
    }
    validateCreatePermission() {
        return [(0, express_validator_1.body)("name", "Falta el nombre del permiso").notEmpty().isString()];
    }
    validateAssignRole() {
        return [
            (0, express_validator_1.body)("authId", "El parámetro authId debe ser un número")
                .notEmpty()
                .isNumeric(),
            (0, express_validator_1.body)("roleId", "Formato de rol inválido").notEmpty().isArray({
                min: 1,
            }),
        ];
    }
    validateAssignPermissionToAuth() {
        return [
            this.RequestCheck.required('authId'),
            this.RequestCheck.isArray('permissionId'),
            (0, express_validator_1.body)("permissionId", "Se aceptan entre 1 y 100 permisos")
                .isArray({ min: 1, max: 100 })
        ];
    }
    validateAssignPermissionToRole() {
        return [
            this.RequestCheck.required('roleId'),
            this.RequestCheck.isArray('permissionId'),
            (0, express_validator_1.body)("permissionId", "Se aceptan entre 1 y 100 permisos")
                .isArray({ min: 1, max: 100 })
        ];
    }
}
exports.default = new RoleRequests();
//# sourceMappingURL=RoleRequests.js.map