"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRequest_1 = __importDefault(require("@app/requests/BaseRequest"));
const express_validator_1 = require("express-validator");
const LawyerRepository_1 = __importDefault(require("@source/repositories/LawyerRepository"));
const SourceInterfaces_1 = require("@app/interfaces/SourceInterfaces");
class LawyerRequest extends BaseRequest_1.default {
    lawyerRepo = new LawyerRepository_1.default();
    lawyerCreateRequest() {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.isLength("name", 0, 50),
            this.RequestCheck.required("lastname"),
            this.RequestCheck.required("payMode"),
            this.RequestCheck.isIn("payMode", "", Object.values(SourceInterfaces_1.ELawyerPaymode)),
            this.RequestCheck.required("payPrice"),
            this.RequestCheck.isFloat("payPrice"),
            this.RequestCheck.isLength("lastname", 0, 50),
            this.RequestCheck.isLength("exequatur", 2, 20).optional({ values: "falsy" }),
            (0, express_validator_1.body)("exequatur", "Este exequátur ya está registrado")
                .custom((value) => this.checkUnique("exequatur", value))
                .optional({ values: "falsy" })
        ];
    }
    lawyerUpdateRequest() {
        return [
            this.RequestCheck.isLength("name", 0, 50).optional(),
            this.RequestCheck.isLength("lastname", 0, 50).optional(),
            this.RequestCheck.isIn("payMode", "", Object.values(SourceInterfaces_1.ELawyerPaymode)).optional(),
            this.RequestCheck.isFloat("payPrice").optional(),
            this.RequestCheck.isLength("exequatur", 2, 20).optional({ values: "falsy" }),
            this.RequestCheck.isString("infoId").optional(),
            (0, express_validator_1.body)("exequatur", "Este exequátur ya está registrado")
                .custom((value, meta) => this.checkUnique("exequatur", value, meta.req.params))
                .optional({ values: "falsy" })
        ];
    }
    async checkUnique(field, value, params) {
        const existingLawyer = await this.lawyerRepo.getAll({
            filter: [
                `${field}:eq:${value}:and`,
                `id:ne:${params?.id || 0}:and`,
            ],
            limit: 1
        });
        if (existingLawyer)
            return Promise.reject(false);
        return Promise.resolve(true);
    }
}
exports.default = new LawyerRequest();
//# sourceMappingURL=LawyerRequest.js.map