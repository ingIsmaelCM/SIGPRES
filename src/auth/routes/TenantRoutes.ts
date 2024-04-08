import BaseRoutes from "@app/routes/BaseRoutes";
import TenantController from "../controllers/TenantController";
import RoleMiddleware from "../middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";
import TenantRequest from "../requests/TenantRequest";

export default class TenantRoutes extends BaseRoutes<TenantController> {

  constructor() {
    super(new TenantController());
  }

  initRoutes(): void {
    this.controller.router
      .route("/")
      .get(
        RoleMiddleware.hasPermission(PermissionEnums.getTenants),
        (req: any, res: any) => this.controller.getTenants(req, res)
      )
      .post(
        RoleMiddleware.hasPermission(PermissionEnums.createTenant),
        TenantRequest.createTenantRequest(),
        TenantRequest.validate,
        (req: any, res: any) => this.controller.createTenant(req, res)
      );

    this.controller.router.post('/:id/assign',
        RoleMiddleware.hasPermission(PermissionEnums.createTenant),
        TenantRequest.assignTenantRequest(),
        TenantRequest.requireIdRequest(),
        TenantRequest.validate,
        (req: any, res: any) => this.controller.assignToUser(req, res)
    )

    this.controller.router.post('/switch',
        TenantRequest.switchTenantRequest(),
        TenantRequest.validate,
        (req: any, res: any) => this.controller.switchTenant(req, res)
    )

    this.controller.router
      .route("/:id")
      .put(
        RoleMiddleware.hasPermission(PermissionEnums.editTenant),
        TenantRequest.updateTenantRequest(),
        TenantRequest.requireIdRequest(),
        TenantRequest.validate,
        (req: any, res: any) => this.controller.updateTenant(req, res)
      );
  }
}
