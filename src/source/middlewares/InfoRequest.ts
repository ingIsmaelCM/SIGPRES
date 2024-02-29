import BaseRequest from "@/app/middlewares/BaseRequest";
import { ValidationChain, body } from "express-validator";
import { EInfoModels } from "../utils/SourceInterfaces";

class InfoRequest extends BaseRequest {
  createInfoRequest(): Array<ValidationChain> {
    return [
      body("dni", "Se requiere un DNI/ID").exists().notEmpty(),
      body("dni", "Revise el formato de DNI").isLength({ min: 10, max: 18 }),
      body("phone", "Se requiere un Nº. de Teléfono").exists().notEmpty(),
      body("phone", "Revise el formato de Teléfono").isLength({
        min: 10,
        max: 15,
      }),
      body("email", "Revise el formado de correo").optional().isEmail(),
      body("birthdate", "La fecha de nacimiento no es válida")
        .optional()
        .isDate()
        .custom((value: string) => {
          const date = new Date(value);
          return !isNaN(date.getTime());
        }),
      body("address", "La dirección es muy extensa").optional().isLength({
        min: 1,
        max: 125,
      }),
      body("modelType", "Indique el modelo asociado").exists().notEmpty(),
      body("modelType", "El modelo indicado no es válido").isIn(
        Object.values(EInfoModels)
      ),
      body("modelId", "Ingrese el id del modelo relacionado").exists().isInt(),
    ];
  }
}

export default new InfoRequest();