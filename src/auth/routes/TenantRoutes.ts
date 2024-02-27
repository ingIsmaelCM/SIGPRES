import AbstractRoutes from "@/app/routes/AbstractRoutes";
import TenantController from "../controllers/TenantController";
import RoleMiddleware from "../middlewares/RoleMiddleware";
import PermissionEnums from "@/app/utils/PermissionEnums";
import TenantRequest from "../middlewares/TenantRequest";

export default class TenantRoutes extends AbstractRoutes<TenantController> {
  initRoutes(): void {
    this.router
      .route("/")
      .get(
        RoleMiddleware.hasPermission(PermissionEnums.getTenant),
        (req: any, res: any) => this.controller.getTenants(req, res)
      )
      .post(
        RoleMiddleware.hasPermission(PermissionEnums.createTenant),
        TenantRequest.createTenantRequest(),
        TenantRequest.validate,
        (req: any, res: any) => this.controller.createTenant(req, res)
      );

    this.router
      .route("/:id")
      .put(
        RoleMiddleware.hasPermission(PermissionEnums.editTenant),
        TenantRequest.updateTenantRequest(),
        TenantRequest.validate,
        (req: any, res: any) => this.controller.updateTenant(req, res)
      );
  }
}
