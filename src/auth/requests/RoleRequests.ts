import BaseRequest from "@app/requests/BaseRequest";
import { ValidationChain, body } from "express-validator";

class RoleRequests extends BaseRequest {
  public validateCreateRole(): Array<ValidationChain> {
    return [body("name", "Falta el nombre del rol").notEmpty().isString()];
  }
  public validateCreatePermission(): Array<ValidationChain> {
    return [body("name", "Falta el nombre del permiso").notEmpty().isString()];
  }
  public validateAssignRole(): Array<ValidationChain> {
    return [
      body("authId", "El parámetro authId debe ser un número")
        .notEmpty()
        .isNumeric(),
      body("roleId", "Formato de rol inválido").notEmpty().isArray({
        min: 1,
      }),
    ];
  }

  public validateAssignPermissionToAuth(): Array<ValidationChain> {
    return [
        this.RequestCheck.required('authId'),
        this.RequestCheck.isArray('permissionId'),
        body("permissionId", "Se aceptan entre 1 y 100 permisos")
            .isArray({min: 1, max:100})
    ];
  }

  public validateAssignPermissionToRole(): Array<ValidationChain> {
    return [
      this.RequestCheck.required('roleId'),
      this.RequestCheck.isArray('permissionId'),
      body("permissionId", "Se aceptan entre 1 y 100 permisos")
          .isArray({min: 1, max:100})
    ];
  }
}

export default new RoleRequests();
