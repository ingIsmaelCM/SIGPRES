import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";
import {EInfoGender} from "@app/interfaces/SourceInterfaces";
import InfoRepository from "@source/repositories/InfoRepository";

class InfoRequest extends BaseRequest {
    infoRepo = new InfoRepository();

    infoCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("dni"),
            this.RequestMessage.isLength("dni", 10, 18),
            body("dni", "Este dni ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("dni", val, meta.req.params)),
            this.RequestMessage.required("phone"),
            this.RequestMessage.isLength("phone", 10, 15).optional(),
            body("phone", "Este teléfono ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("phone", val, meta.req.params)),
            this.RequestMessage.isEmail("info.email").optional(),
            body("email", "Este correo ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("email", val, meta.req.params)),
            this.RequestMessage.isDate("birthdate").optional(),
            this.RequestMessage.isIn("gender", "Masculino | Femenino | Ninguno",
                [EInfoGender.Masculino, EInfoGender.Femenino, EInfoGender.Ninguno]).optional(),
            this.RequestMessage.isLength("address", 2, 125).optional(),
            this.RequestMessage.isString("country").optional(),
        ]
    }

    infoUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.isLength("dni", 10, 18).optional(),
            body("dni", "Este dni ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("dni", val, meta.req.params)),
            this.RequestMessage.isLength("phone", 10, 15).optional(),
            body("phone", "Este teléfono ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("phone", val, meta.req.params)),
            this.RequestMessage.isEmail("info.email").optional(),
            body("email", "Este correo ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("email", val, meta.req.params)),
            this.RequestMessage.isDate("birthdate").optional(),
            this.RequestMessage.isIn("gender", "Masculino | Femenino | Ninguno",
                [EInfoGender.Masculino, EInfoGender.Femenino, EInfoGender.Ninguno]).optional(),
            this.RequestMessage.isLength("address", 2, 125).optional(),
            this.RequestMessage.isString("country").optional(),
        ]
    }

    relatedInfoRequest(): Array<ValidationChain> {
        return [
            this.RequestMessage.required("info"),
            body("info", "Formato de info inválido").isObject(),
            this.RequestMessage.required("info.dni"),
            this.RequestMessage.isLength("info.dni", 10, 18),
            body("info.dni", "Este dni ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("dni", val)),
            this.RequestMessage.required("info.phone"),
            this.RequestMessage.isLength("info.phone", 10, 15),
            body("info.phone", "Este teléfono ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("phone", val)),
            this.RequestMessage.isEmail("info.email").optional(),
            body("info.email", "Este correo ya está registrado")
                .custom(async (val: string, meta: any) =>
                    await this.checkUnique("email", val)),
            this.RequestMessage.isDate("info.birthdate").optional(),
            this.RequestMessage.isIn("gender", "Masculino | Femenino | Ninguno",
                [EInfoGender.Masculino, EInfoGender.Femenino, EInfoGender.Ninguno]).optional(),
            this.RequestMessage.isLength("address", 2, 125).optional(),
            this.RequestMessage.isString("country").optional(),
        ]
    }

    private async checkUnique(field: string, value: string, params?: { id: any }) {
        const existingInfo = await this.infoRepo.getAll({
            filter: [
                `${field}:eq:${value}:and`,
                `id:ne:${params?.id || 0}:and`,
            ],
            limit: 1
        });
        if (existingInfo) return Promise.reject(false);
        return Promise.resolve(true);
    }
}

export default new InfoRequest();