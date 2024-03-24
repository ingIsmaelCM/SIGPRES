import BaseRoutes from "@app/routes/BaseRoutes";
import ImageController from "@source/controllers/ImageController";
import {Request, Response} from "express";
import ImageRequest from "@source/requests/ImageRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class ImageRoutes extends BaseRoutes<ImageController> {
    constructor() {
        super(new ImageController());
    }

    initRoutes(): void {

        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getImages),
                (req: Request, res: Response) => this.controller.index(req, res)
            )

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getImages),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteImage),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}