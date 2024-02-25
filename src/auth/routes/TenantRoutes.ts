import AbstractRoutes from "@/app/routes/AbstractRoutes";
import TenantController from "../controllers/TenantController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import RoleMiddeware from "../middlewares/RoleMiddeware";
import PermissionEnums from "@/app/utils/PermissionEnums";
import TenantRequest from "../middlewares/TenantRequest";

export default class TenantRoutes extends AbstractRoutes<TenantController> {
  initRoutes(): void {
    this.router
      .route("/")
      .get(
        AuthMiddleware.auth,
        RoleMiddeware.hasPermission(PermissionEnums.getTenant),
        (req: any, res: any) => this.controller.getTenants(req, res)
      )
      .post(
        AuthMiddleware.auth,
        RoleMiddeware.hasPermission(PermissionEnums.createTenant),
        TenantRequest.createTenantRequest(),
        TenantRequest.validate,
        (req: any, res: any) => this.controller.createTenant(req, res)
      );

    this.router
      .route("/:id")
      .put(
        AuthMiddleware.auth,
        RoleMiddeware.hasPermission(PermissionEnums.editTenant),
        TenantRequest.updateTenantRequest(),
        TenantRequest.validate,
        (req: any, res: any) => this.controller.updateTenant(req, res)
      );
  }
}
