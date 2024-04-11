"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const AuthRepository_1 = require("@auth/repositories/AuthRepository");
class AuthRequest extends BaseRequest_1.default {
    PASSREGEX = `^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,25})`;
    authRepo = new AuthRepository_1.AuthRepository();
    validateAuthRegister() {
        return [
            this.RequestCheck.required("email"),
            this.RequestCheck.isEmail("email"),
            (0, express_validator_1.body)("email", "Este correo ya está registrado")
                .custom(async (value) => await this.checkUnique("email", value)),
            (0, express_validator_1.body)("username", "Este usuario ya está registrado")
                .custom(async (value) => await this.checkUnique("username", value)),
            this.RequestCheck.required("password"),
            (0, express_validator_1.body)("password", "La contraseña ingresada es muy débil")
                .custom((value) => {
                return value.match(this.PASSREGEX);
            }),
            this.RequestCheck.required("username"),
            this.RequestCheck.required("name"),
            this.RequestCheck.isLength("name", 5, 50),
            this.RequestCheck.required("lastname"),
            this.RequestCheck.isLength("lastname", 5, 50),
        ];
    }
    validateAuthLogin() {
        return [
            this.RequestCheck.required("password"),
            (0, express_validator_1.body)("password", "La contraseña ingresada es muy débil")
                .custom((value) => {
                return value.match(this.PASSREGEX);
            }),
            this.RequestCheck.required("username"),
        ];
    }
    validatePasswordReset() {
        return [
            (0, express_validator_1.body)("password", "Se requiere la nueva contraseña").notEmpty(),
            (0, express_validator_1.body)("password", "La contraseña debe estar entre 6 y 25").isLength({
                min: 6,
                max: 25,
            }),
            (0, express_validator_1.body)("password", "La contraseña ingresada es muy débil").custom((value) => {
                return value.match(this.PASSREGEX);
            }),
            (0, express_validator_1.body)("password_confirmation", "Se requiere la confirmación").notEmpty(),
            (0, express_validator_1.body)("password_confirmation", "Las contraseñas no coinciden").custom((value, { req }) => {
                return value === req.body.password;
            }),
        ];
    }
    validateRecoverAndVerifyEmail() {
        return [
            (0, express_validator_1.body)("email", "Se requiere el correo electrónico").notEmpty(),
            (0, express_validator_1.body)("email", "El formato del correo no es válido").isEmail(),
        ];
    }
    validateRecoverPasswordAndVerifyAccount() {
        return [
            (0, express_validator_1.body)("code", "Ingrese el código").exists().notEmpty(),
            (0, express_validator_1.body)("code", "El código ingresado no es válido").isString().isLength({ min: 6, max: 6 }),
            (0, express_validator_1.body)("email", "Se requiere el correo electrónico").notEmpty(),
            (0, express_validator_1.body)("email", "El formato del correo no es válido").isEmail(),
        ];
    }
    async checkUnique(field, value, params) {
        const existingInfo = await this.authRepo.getAll({
            filter: [
                `${field}:eq:${value}:and`,
                `id:ne:${params?.id || 0}:and`,
            ],
            limit: 1
        });
        if (existingInfo)
            return Promise.reject(false);
        return Promise.resolve(true);
    }
}
exports.default = new AuthRequest();
//# sourceMappingURL=AuthRequest.js.map