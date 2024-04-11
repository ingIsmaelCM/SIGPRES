"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const express_validator_1 = require("express-validator");
const AuthRepository_1 = require("@auth/repositories/AuthRepository");
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
class UserRequest extends BaseRequest_1.default {
    authRepo = new AuthRepository_1.AuthRepository();
    userCreateRequest() {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.required("lastname"),
            this.RequestCheck.required("email"),
            this.RequestCheck.required("username"),
            this.RequestCheck.required("password"),
            (0, express_validator_1.body)("email", "Este correo ya está registrado")
                .custom(async (value) => await this.checkUnique("email", value)),
            (0, express_validator_1.body)("username", "Este usuario ya está registrado")
                .custom(async (value) => await this.checkUnique("username", value)),
        ];
    }
    userUpdateRequest() {
        return [
            this.RequestCheck.isString("name").optional({ values: "falsy" }),
            this.RequestCheck.isString("lastname").optional({ values: "falsy" }),
            this.RequestCheck.isLength("dni", 8, 18).optional({ values: "falsy" }),
            this.RequestCheck.isDate("birthdate").optional({ values: "falsy" }),
            this.RequestCheck.isIn("gender", "Masculino | Femenino | Ninguno", [SourceInterfaces_1.EInfoGender.Masculino, SourceInterfaces_1.EInfoGender.Femenino, SourceInterfaces_1.EInfoGender.Ninguno]).optional({ values: "falsy" }),
            this.RequestCheck.isLength("address", 2, 125).optional({ values: "falsy" }),
            this.RequestCheck.isString("country").optional({ values: "falsy" }),
        ];
    }
    userSendVerificationRequest() {
        return [
            this.RequestCheck.required("email"),
            this.RequestCheck.isEmail("email")
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
exports.default = new UserRequest();
//# sourceMappingURL=UserRequest.js.map