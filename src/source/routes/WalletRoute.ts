import BaseRoutes from "@app/routes/BaseRoutes";
import WalletController from "@source/controllers/WalletController";
import {Request, Response} from "express";
import WalletRequest from "@source/requests/WalletRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class WalletRoutes extends BaseRoutes<WalletController> {
    constructor() {
        super(new WalletController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getWallets),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createWallet),
                WalletRequest.walletCreateRequest(),
                WalletRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.put("/:id/balance/add",
            RoleMiddleware.hasPermission(PermissionEnums.createWallet),
            WalletRequest.walletAddBalanceRequest(),
            WalletRequest.requireIdRequest(),
            WalletRequest.validate,
            (req: Request, res: Response) => this.controller.addBalance(req, res)
        );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getWallets),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editWallet),
                WalletRequest.walletUpdateRequest(),
                WalletRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteWallet),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}