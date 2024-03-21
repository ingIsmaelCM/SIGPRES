import BaseRequest from "@app/requests/BaseRequest";
import { ValidationChain, body, param } from "express-validator";

class TenantRequest extends BaseRequest {
  createTenantRequest(): Array<ValidationChain> {
    return [
      body("name", "Indique el nombre del Inquilino").exists().notEmpty(),
    ];
  }
  updateTenantRequest(): Array<ValidationChain> {
    return [
      body("name", "Indique el nombre del Inquilino").exists().notEmpty(),
      body("key", "La clave de inquilino no puede motificarse").not().exists(),
      param("id", "Indique el id del Inquilino")
        .exists()
        .notEmpty()
        .isNumeric(),
    ];
  }
}

export default new TenantRequest();
