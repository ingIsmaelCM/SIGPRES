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
    ];
  }

  assignTenantRequest(): Array<ValidationChain> {
    return [
      this.RequestCheck.required("authIds"),
      body("authIds","Indique al menos un usuario")
          .isArray({min: 1, max: 100})
    ];
  }
}

export default new TenantRequest();
