import BaseRequest from "@/app/middlewares/BaseRequest";
import {ValidationChain, body} from "express-validator";
import {EInfoGender, EInfoModels} from "../utils/SourceInterfaces";

class InfoRequest extends BaseRequest {
    upsertInfoRequest(): Array<ValidationChain> {
        return [
            body("dni", "Se requiere un DNI/ID").exists().notEmpty(),
            body("dni", "Revise el formato de DNI").isLength({min: 10, max: 18}),
            body("phone", "Se requiere un Nº. de Teléfono").exists().notEmpty(),
            body("phone", "Revise el formato de Teléfono").isLength({
                min: 10,
                max: 15,
            }),

            body("email", "Revise el formado de correo")
                .optional()
                .isEmail(),
            body("birthdate", "La fecha de nacimiento no es válida")
                .optional()
                .isISO8601().toDate(),
            body("address", "La dirección es muy extensa").optional().isLength({
                min: 1,
                max: 125,
            }),
            body("gender", "Ingrese un género válido")
                .optional()
                .isIn(Object.values(EInfoGender)),
            body("country", "El nombre de país no es válido").optional().isString().isLength({max: 75})
        ];
    }
}

export default new InfoRequest();
