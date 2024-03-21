import PreferenceController from "@app/controllers/PreferenceController";
import BaseRoutes from "@app/routes/BaseRoutes";
import RoleMiddleware from "@auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";
import PreferenceRequest from "@app/middlewares/PreferenceRequest";

export default class PreferenceRoutes extends BaseRoutes<PreferenceController> {

  constructor() {
    super(new PreferenceController());
  }
  initRoutes(): void {
    this.router.get(
      "/",
      RoleMiddleware.hasPermission(PermissionEnums.getPreferences),
      (req: any, res: any) => this.controller.getPreferences(req, res)
    );
    this.router.post(
      "/:key",
      RoleMiddleware.hasPermission(PermissionEnums.setPreference),
      PreferenceRequest.setPreferenceRequest(),
      PreferenceRequest.validate,
      (req: any, res: any) => this.controller.setPreference(req, res)
    );
    this.router.get(
      "/:key",
      RoleMiddleware.hasPermission(PermissionEnums.getPreferences),
      PreferenceRequest.getPreferenceRequest(),
      PreferenceRequest.validate,
      (req: any, res: any) => this.controller.getPreference(req, res)
    );
  }
}
