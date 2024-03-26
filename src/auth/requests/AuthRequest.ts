import {body, ValidationChain} from "express-validator";
import BaseRequest from "@app/requests/BaseRequest";
import {AuthRepository} from "@auth/repositories/AuthRepository";

class AuthRequest extends BaseRequest {
    PASSREGEX = `^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,25})`
    private authRepo = new AuthRepository();

    public validateAuthRegister(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("email"),
            this.RequestCheck.isEmail("email"),
            body("email", "Este correo ya está registrado")
                .custom(async (value: string) =>
                    await this.checkUnique("email", value)),
            body("username", "Este usuario ya está registrado")
                .custom(async (value: string) =>
                    await this.checkUnique("username", value)),
            this.RequestCheck.required("password"),
            body("password", "La contraseña ingresada es muy débil")
                .custom((value: string) => {
                    return value.match(this.PASSREGEX)
                }),
            this.RequestCheck.required("username"),
            this.RequestCheck.required("name"),
            this.RequestCheck.isLength("name",5,50),
            this.RequestCheck.required("lastname"),
            this.RequestCheck.isLength("lastname",5,50),
        ];
    }

    public validateAuthLogin(): Array<ValidationChain> {
        return [
            this.RequestCheck.required("password"),
            body("password", "La contraseña ingresada es muy débil")
                .custom((value: string) => {
                    return value.match(this.PASSREGEX)
                }),
            this.RequestCheck.required("username"),
        ];
    }

    public validatePasswordReset(): Array<ValidationChain> {
        return [
            body("password", "Se requiere la nueva contraseña").notEmpty(),
            body("password", "La contraseña debe estar entre 6 y 25").isLength({
                min: 6,
                max: 25,
            }),
            body("password", "La contraseña ingresada es muy débil").custom((value: string) => {
                return value.match(this.PASSREGEX)
            }),
            body("password_confirmation", "Se requiere la confirmación").notEmpty(),
            body("password_confirmation", "Las contraseñas no coinciden").custom(
                (value, {req}) => {
                    return value === req.body.password;
                }
            ),
        ];
    }

    public validateRecoverEmail(): Array<ValidationChain> {
        return [
            body("email", "Se requiere el correo electrónico").notEmpty(),
            body("email", "El formato del correo no es válido").isEmail(),
        ];
    }

    public validateRecoverPassword(): Array<ValidationChain> {
        return [
            body("code", "Ingrese el código").exists().notEmpty(),
            body("code", "El código ingresado no es válido").isString().isLength({min: 6, max: 6}),
            body("email", "Se requiere el correo electrónico").notEmpty(),
            body("email", "El formato del correo no es válido").isEmail(),
        ];
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

export default new AuthRequest();
