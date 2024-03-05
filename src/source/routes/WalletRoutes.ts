import AbstractRoutes from "@/app/routes/AbstractRoutes";
import WalletController from "../controllers/WalletController";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/utils/PermissionEnums";
import { Request, Response } from "express";

export default class WalletRoutes extends AbstractRoutes<WalletController> {
  initRoutes(): void {
    this.router
      .route("/")
      .get(
        RoleMiddleware.hasPermission(PermissionEnums.getWallet),
        (req: Request, res: Response) => this.controller.getWallets(req, res)
      );
  }
}
