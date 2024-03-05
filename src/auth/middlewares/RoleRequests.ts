import BaseRequest from "@/app/middlewares/BaseRequest";
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

  public validateAssingPermissionToAuth(): Array<ValidationChain> {
    return [
      body("authId", "El parámetro authId debe ser un número")
        .notEmpty()
        .isNumeric(),
      body("permissionId", "Formato de permisos inválido").notEmpty().isArray({
        min: 1,
      }),
    ];
  }

  public validateAssingPermissionToRole(): Array<ValidationChain> {
    return [
      body("roleId", "El parámetro roleId debe ser un número")
        .notEmpty()
        .isNumeric(),
      body("permissionId", "Formato de permisos inválido").notEmpty().isArray({
        min: 1,
      }),
    ];
  }
}

export default new RoleRequests();
