import BaseRequest from "@/app/middlewares/BaseRequest";
import { ValidationChain, body } from "express-validator";

class ConditionRequest extends BaseRequest {
  createConditionRequest(): Array<ValidationChain> {
    return [
      body("initTerm", "Indique los días de recargo inicial")
        .exists()
        .notEmpty(),
      body("initTerm", "Valor no válido para días de recargo inicial").isInt({
        min: 0,
      }),
      body("initRateMora", "Indique la tasa de recargo inicial")
        .exists()
        .notEmpty(),
      body("initRateMora", "Valor no válido para tasa de recargo inicial")
        .isNumeric()
        .isLength({ min: 1 }),
      body("finalRateMora", "Indique la tasa de recargo final")
        .exists()
        .notEmpty(),
      body("finalRateMora", "Valor no válido para tasa de recargo final")
        .isNumeric()
        .isLength({ min: 1 }),
      body("grace", "Los días de gracias deben ser un valor numérico")
        .optional()
        .isInt({ min: 0 }),
      body("rate", "Ingrese una tasa de interés").exists().notEmpty(),
      body("rate", "La tasa de interés debe ser un valor válido").isNumeric(),
    ];
  }
}

export default new ConditionRequest();
