import BaseRequest from "@app/requests/BaseRequest";
import {body, ValidationChain} from "express-validator";
import {AuthRepository} from "@auth/repositories/AuthRepository";
import {EInfoGender} from "@app/interfaces/SourceInterfaces";

class UserRequest extends BaseRequest {
    private authRepo = new AuthRepository();

    userCreateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("name"),
            this.RequestCheck.required("lastname"),
            this.RequestCheck.required("email"),
            this.RequestCheck.required("username"),
            this.RequestCheck.required("password"),
            body("email", "Este correo ya está registrado")
                .custom(async (value: string) =>
                    await this.checkUnique("email", value)),
            body("username", "Este usuario ya está registrado")
                .custom(async (value: string) =>
                    await this.checkUnique("username", value)),
        ]
    }

    userUpdateRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.isString("name").optional({values: "falsy"}),
            this.RequestCheck.isString("lastname").optional({values: "falsy"}),
            this.RequestCheck.isLength("dni", 8, 18).optional({values: "falsy"}),
            this.RequestCheck.isDate("birthdate").optional({values: "falsy"}),
            this.RequestCheck.isIn("gender", "Masculino | Femenino | Ninguno",
                [EInfoGender.Masculino, EInfoGender.Femenino, EInfoGender.Ninguno]).optional({values: "falsy"}),
            this.RequestCheck.isLength("address", 2, 125).optional({values: "falsy"}),
            this.RequestCheck.isString("country").optional({values: "falsy"}),
        ]
    }

    userSendVerificationRequest(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("email"),
            this.RequestCheck.isEmail("email")
        ]
    }

    private async checkUnique(field: string, value: string, params?: { id: any }) {
        const existingInfo = await this.authRepo.getAll({
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

export default new UserRequest();