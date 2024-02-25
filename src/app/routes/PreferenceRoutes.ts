import { Router } from "express";
import PreferenceController from "../controllers/PreferenceController";
import AbstractRoutes from "./AbstractRoutes";
import AuthMiddleware from "@/auth/middlewares/AuthMiddleware";
import RoleMiddeware from "@/auth/middlewares/RoleMiddeware";
import PermissionEnums from "../utils/PermissionEnums";
import PreferenceRequest from "../middlewares/PreferenceRequest";

export default class PreferenceRoutes extends AbstractRoutes<PreferenceController> {
  constructor(router: Router, controller: PreferenceController) {
    super(router, controller);
  }

  initRoutes(): void {
    this.router.post(
      "/:key",
      AuthMiddleware.auth,
      RoleMiddeware.hasPermission(PermissionEnums.setPreference),
      PreferenceRequest.setPreferenceRequest(),
      PreferenceRequest.validate,
      (req: any, res: any) => this.controller.setPreference(req, res)
    );
    this.router.get(
      "/:key",
      AuthMiddleware.auth,
      RoleMiddeware.hasPermission(PermissionEnums.getPreference),
      PreferenceRequest.getPreferenceRequest(),
      PreferenceRequest.validate,
      (req: any, res: any) => this.controller.getPreference(req, res)
    );
  }
}
