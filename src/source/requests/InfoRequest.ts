import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";
import {EInfoGender} from "@app/interfaces/SourceInterfaces";
import InfoRepository from "@source/repositories/InfoRepository";

class InfoRequest extends BaseRequest {
    infoRepo = new InfoRepository();

    infoCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("dni"),
            this.RequestCheck.isLength("dni", 8, 18),
            body("dni", "Este dni ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("dni", val)),
            this.RequestCheck.required("phone"),
            this.RequestCheck.isLength("phone", 10, 15).optional({values: "falsy"}),
            body("phone", "Este teléfono ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("phone", val)),
            this.RequestCheck.isEmail("email").optional({values: "falsy"}),
            body("email", "Este correo ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("email", val)),
            this.RequestCheck.isDate("birthdate").optional({values: "falsy"}),
            this.RequestCheck.isIn("gender", "Masculino | Femenino | Ninguno",
                [EInfoGender.Masculino, EInfoGender.Femenino, EInfoGender.Ninguno]).optional({values: "falsy"}),
            this.RequestCheck.isLength("address", 2, 125).optional({values: "falsy"}),
            this.RequestCheck.isString("country").optional({values: "falsy"}),
        ]
    }

    infoUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.isLength("dni", 8, 18).optional({values: "falsy"}),
            body("dni", "Este dni ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("dni", val, meta.req.params.id)),
            this.RequestCheck.isLength("phone", 10, 15).optional({values: "falsy"}),

            body("phone", "Este teléfono ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("phone", val, meta.req.params.id)),
            this.RequestCheck.isEmail("email").optional({values: "falsy"}),
            body("email", "Este correo ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("email", val, meta.req.params.id)),
            this.RequestCheck.isDate("birthdate").optional({values: "falsy"}),
            this.RequestCheck.isIn("gender", "Masculino | Femenino | Ninguno",
                [EInfoGender.Masculino, EInfoGender.Femenino, EInfoGender.Ninguno]).optional({values: "falsy"}),
            this.RequestCheck.isLength("address", 2, 125).optional({values: "falsy"}),
            this.RequestCheck.isString("country").optional({values: "falsy"}),
        ]
    }

    relatedInfoRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("dni"),
            this.RequestCheck.isLength("dni", 8, 18),
            body("dni", "Este dni ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("dni", val, meta.req.body.infoId)),
            this.RequestCheck.required("phone"),
            this.RequestCheck.isLength("phone", 10, 15),
            body("phone", "Este teléfono ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("phone", val, meta.req.body.infoId)),
            this.RequestCheck.isEmail("email").optional({values: "falsy"}),
            body("email", "Este correo ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("email", val, meta.req.body.infoId)),
            this.RequestCheck.isDate("birthdate").optional({values: "falsy"}),
            this.RequestCheck.isIn("gender", "Masculino | Femenino | Ninguno",
                [EInfoGender.Masculino, EInfoGender.Femenino, EInfoGender.Ninguno]).optional({values: "falsy"}),
            this.RequestCheck.isLength("address", 2, 125).optional({values: "falsy"}),
            this.RequestCheck.isString("country").optional({values: "falsy"}),
        ]
    }

    private async checkUnique(field: string, value: string, column?:string) {
        const existingInfo = await this.infoRepo.getAll({
            filter: [
                `${field}:eq:${value}:and`,
                `id:ne:${column|| 0}:and`,
            ],
            limit: 1
        });
        if (existingInfo) return Promise.reject(false);
        return Promise.resolve(true);
    }
}

export default new InfoRequest();