import BaseRoutes from "@app/routes/BaseRoutes";
import DocumentController from "@source/controllers/DocumentController";
import {Request, Response} from "express";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class DocumentRoutes extends BaseRoutes<DocumentController> {
    constructor() {
        super(new DocumentController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getDocuments),
                (req: Request, res: Response) => this.controller.index(req, res)
            )


        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getDocuments),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteDocument),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}