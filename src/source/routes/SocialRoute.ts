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
                RoleMiddleware.hasPermission(PermissionEnums.createSocial),
                SocialRequest.socialCreateRequest(),
                SocialRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getSocials),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editSocial),
                SocialRequest.socialUpdateRequest(),
                SocialRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteSocial),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}