"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const express_validator_1 = require("express-validator");
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
const InfoRepository_1 = __importDefault(require("@source/repositories/InfoRepository"));
class InfoRequest extends BaseRequest_1.default {
    infoRepo = new InfoRepository_1.default();
    infoCreateRequest() {
        return [
            this.RequestCheck.isLength("dni", 8, 18).optional({ values: "falsy" }),
            (0, express_validator_1.body)("dni", "Este dni ya está registrado")
                .custom(async (val, meta) => await this.checkUnique("dni", val)),
            this.RequestCheck.isLength("phone", 10, 15).optional({ values: "falsy" }),
            (0, express_validator_1.body)("phone", "Este teléfono ya está registrado")
                .custom(async (val, meta) => await this.checkUnique("phone", val)),
            this.RequestCheck.isEmail("email").optional({ values: "falsy" }),
            (0, express_validator_1.body)("email", "Este correo ya está registrado")
                .custom(async (val, meta) => await this.checkUnique("email", val)),
            this.RequestCheck.isDate("birthdate").optional({ values: "falsy" }),
            this.RequestCheck.isIn("gender", "Masculino | Femenino | Ninguno", [SourceInterfaces_1.EInfoGender.Masculino, SourceInterfaces_1.EInfoGender.Femenino, SourceInterfaces_1.EInfoGender.Ninguno]).optional({ values: "falsy" }),
            this.RequestCheck.isLength("address", 2, 125).optional({ values: "falsy" }),
            this.RequestCheck.isString("country").optional({ values: "falsy" }),
        ];
    }
    infoUpdateRequest() {
        return [
            this.RequestCheck.isLength("dni", 8, 18).optional({ values: "falsy" }),
            (0, express_validator_1.body)("dni", "Este dni ya está registrado")
                .custom(async (val, meta) => await this.checkUnique("dni", val, meta.req.params.id)),
            this.RequestCheck.isLength("phone", 10, 15).optional({ values: "falsy" }),
            (0, express_validator_1.body)("phone", "Este teléfono ya está registrado")
                .custom(async (val, meta) => await this.checkUnique("phone", val, meta.req.params.id)),
            this.RequestCheck.isEmail("email").optional({ values: "falsy" }),
            (0, express_validator_1.body)("email", "Este correo ya está registrado")
                .custom(async (val, meta) => await this.checkUnique("email", val, meta.req.params.id)),
            this.RequestCheck.isDate("birthdate").optional({ values: "falsy" }),
            this.RequestCheck.isIn("gender", "Masculino | Femenino | Ninguno", [SourceInterfaces_1.EInfoGender.Masculino, SourceInterfaces_1.EInfoGender.Femenino, SourceInterfaces_1.EInfoGender.Ninguno]).optional({ values: "falsy" }),
            this.RequestCheck.isLength("address", 2, 125).optional({ values: "falsy" }),
            this.RequestCheck.isString("country").optional({ values: "falsy" }),
        ];
    }
    infoUpsertForJobRequest() {
        return [
            this.RequestCheck.isLength("dni", 8, 18).optional({ values: "falsy" }),
            this.RequestCheck.required("phone"),
            this.RequestCheck.isLength("phone", 10, 15),
            this.RequestCheck.isDate("birthdate").optional({ values: "falsy" }),
            this.RequestCheck.isIn("gender", "Masculino | Femenino | Ninguno", [SourceInterfaces_1.EInfoGender.Masculino, SourceInterfaces_1.EInfoGender.Femenino, SourceInterfaces_1.EInfoGender.Ninguno]).optional({ values: "falsy" }),
            this.RequestCheck.isLength("address", 2, 125).optional({ values: "falsy" }),
            this.RequestCheck.isString("country").optional({ values: "falsy" }),
            this.RequestCheck.isEmail("email").optional({ values: "falsy" }),
        ];
    }
    relatedInfoRequest() {
        return [
            this.RequestCheck.isLength("dni", 8, 18).optional({ values: "falsy" }),
            (0, express_validator_1.body)("dni", "Este dni ya está registrado")
                .custom(async (val, meta) => await this.checkUnique("dni", val, meta.req.body.infoId)),
            this.RequestCheck.required("phone"),
            this.RequestCheck.isLength("phone", 10, 15),
            (0, express_validator_1.body)("phone", "Este teléfono ya está registrado")
                .custom(async (val, meta) => await this.checkUnique("phone", val, meta.req.body.infoId)),
            this.RequestCheck.isEmail("email").optional({ values: "falsy" }),
            (0, express_validator_1.body)("email", "Este correo ya está registrado")
                .custom(async (val, meta) => await this.checkUnique("email", val, meta.req.body.infoId)),
            this.RequestCheck.isDate("birthdate").optional({ values: "falsy" }),
            this.RequestCheck.isIn("gender", "Masculino | Femenino | Ninguno", [SourceInterfaces_1.EInfoGender.Masculino, SourceInterfaces_1.EInfoGender.Femenino, SourceInterfaces_1.EInfoGender.Ninguno]).optional({ values: "falsy" }),
            this.RequestCheck.isLength("address", 2, 125).optional({ values: "falsy" }),
            this.RequestCheck.isString("country").optional({ values: "falsy" }),
        ];
    }
    async checkUnique(field, value, column) {
        const existingInfo = await this.infoRepo.getAll({
            filter: [
                `${field}:eq:${value}:and`,
                `id:ne:${column || 0}:and`,
            ],
            limit: 1
        });
        if (existingInfo)
            return Promise.reject(false);
        return Promise.resolve(true);
    }
}
exports.default = new InfoRequest();
//# sourceMappingURL=InfoRequest.js.map