import AbstractRoutes from "@/app/routes/AbstractRoutes";
import RoleController from "@auth/controllers/RoleController";
import RoleRequests from "@auth/middlewares/RoleRequests";
import RoleMiddeware from "../middlewares/RoleMiddeware";
import AuthMiddleware from "../middlewares/AuthMiddleware";

export default class RoleRoutes extends AbstractRoutes<RoleController> {
  initRoutes(): void {
    this.router
      .route("/")
      .post(
        AuthMiddleware.auth,
        RoleMiddeware.hasPermission("Crear Rol"),
        RoleRequests.validateCreateRole(),
        RoleRequests.validate,
        (req: any, res: any) => this.controller.createRole(req, res)
      );

    this.router.delete(
      "/:id",
      AuthMiddleware.auth,
      RoleMiddeware.hasPermission("Eliminar Rol"),
      (req: any, res: any) => this.controller.deleteRole(req, res)
    );

    this.router.post(
      "/auth",
      AuthMiddleware.auth,
      RoleMiddeware.hasPermission("Asignar Rol a Usuario"),
      RoleRequests.validateAssignRole(),
      RoleRequests.validate,
      (req: any, res: any) => this.controller.assignRoleToAuth(req, res)
    );

    this.router.post(
      "/auth/permissions",
      AuthMiddleware.auth,
      RoleMiddeware.hasPermission("Asignar Permiso a Usuario"),
      RoleRequests.validateAssingPermissionToAuth(),
      RoleRequests.validate,
      (req: any, res: any) => this.controller.assignPermissionToAuth(req, res)
    );
    this.router.post(
      "/auth/permissions/grantall",
      AuthMiddleware.auth,
      RoleMiddeware.hasPermission("Asignar Permiso a Usuario"),
      RoleRequests.validateAssingPermissionToAuth().slice(0, 1),
      RoleRequests.validate,
      (req: any, res: any) => this.controller.grantAllToAuth(req, res)
    );
    this.router.post(
      "/permissions",
      AuthMiddleware.auth,
      RoleMiddeware.hasPermission("Asignar Permiso a Rol"),
      RoleRequests.validateAssingPermissionToRole(),
      RoleRequests.validate,
      (req: any, res: any) => this.controller.assignPermissionToRole(req, res)
    );
    this.router.post(
      "/permissions/grantall",
      AuthMiddleware.auth,
      RoleMiddeware.hasPermission("Asignar Permiso a Rol"),
      RoleRequests.validateAssingPermissionToRole().slice(0, 1),
      RoleRequests.validate,
      (req: any, res: any) => this.controller.grantAllToRole(req, res)
    );
  }
}
