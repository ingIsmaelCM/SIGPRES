import BaseRoutes from "@app/routes/BaseRoutes";
import SocialController from "@source/controllers/SocialController";
import {Request, Response} from "express";
import SocialRequest from "@source/requests/SocialRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class SocialRoutes extends BaseRoutes<SocialController> {
    constructor() {
        super(new SocialController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getSocials),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasAllPermission([PermissionEnums.createSocial, PermissionEnums.editSocial]),
                SocialRequest.socialCreateRequest(),
                SocialRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getSocials),
                (req: Request, res: Response) => this.controller.show(req, res)
            )

    }

}