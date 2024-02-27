import { Router } from "express";
import PreferenceController from "../controllers/PreferenceController";
import AbstractRoutes from "./AbstractRoutes";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "../utils/PermissionEnums";
import PreferenceRequest from "../middlewares/PreferenceRequest";

export default class PreferenceRoutes extends AbstractRoutes<PreferenceController> {
  initRoutes(): void {
    this.router.get(
      "/",
      RoleMiddleware.hasPermission(PermissionEnums.getPreference),
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
      RoleMiddleware.hasPermission(PermissionEnums.getPreference),
      PreferenceRequest.getPreferenceRequest(),
      PreferenceRequest.validate,
      (req: any, res: any) => this.controller.getPreference(req, res)
    );
  }
}
