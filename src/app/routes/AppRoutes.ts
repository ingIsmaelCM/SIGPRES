import { Router } from "express";
import AbstractRoutes from "@app/routes/AbstractRoutes";
import AppController from "@app/controllers/AppController";
import AuthMiddleware from "@auth/middlewares/AuthMiddleware";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "../utils/PermissionEnums";

export default class AppRoutes extends AbstractRoutes<AppController> {
  constructor(router: Router, controller: AppController) {
    super(router, controller);
  }

  initRoutes(): void {
    this.router.get(
      "/cloudinary/signature",
      RoleMiddleware.hasPermission(PermissionEnums.getCloudinarySign),
      (req: any, res: any) => {
        this.controller.getCloudSignature(req, res);
      }
    );
  }
}
