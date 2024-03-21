import {ValidationChain, body} from "express-validator";
import BaseRequest from "@app/requests/BaseRequest";

class AuthRequest extends BaseRequest {
    public validateAuthRegister(): Array<ValidationChain> {
        return [
            body("email", "Se requiere un correo electrónico").notEmpty(),
            body("email", "El formato del correo no es válido").isEmail(),
            body("password", "Se requiere una contraseña").exists(),
            body("password", "La contraseña debe estar entre 6 y 25").isLength({
                min: 6,
                max: 25,
            }),
            body("username", "Se requiere un nombre de usuario").notEmpty(),
            body("name", "Se requiere un primer nombre").notEmpty(),
            body("lastname", "Se requiere un apellido").notEmpty(),
        ];
    }

    public validateAuthLogin(): Array<ValidationChain> {
        return [
            body("username", "Se requiere un nombre de usuario").not().isEmpty(),
            body("password", "Se requiere una contraseña").exists(),
            body("password", "La contraseña debe estar entre 6 y 25").isLength({
                min: 6,
                max: 25,
            }),
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
                return value.match(`^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})`)
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

}

export default new AuthRequest();
