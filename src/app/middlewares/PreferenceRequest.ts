import BaseRequest from "@app/middlewares/BaseRequest";
import { ValidationChain, body, param } from "express-validator";

class PreferenceRequest extends BaseRequest {
  getPreferenceRequest(): Array<ValidationChain> {
    return [
      param("key", "Debe indicar la clave de la preferencia")
        .exists()
        .notEmpty(),
    ];
  }

  setPreferenceRequest(): Array<ValidationChain> {
    return [
      param("key", "Debe indicar la clave de la preferencia")
        .exists()
        .notEmpty(),
      body("value", "Debe indicar el valor de la preferencia")
        .exists()
        .notEmpty(),
    ];
  }
}

export default new PreferenceRequest();
