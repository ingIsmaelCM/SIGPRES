import BaseRoutes from "@app/routes/BaseRoutes";
import AttributeController from "@source/controllers/AttributeController";
import {Request, Response} from "express";
import AttributeRequest from "@source/requests/AttributeRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/interfaces/PermissionEnums";

export default class AttributeRoutes extends BaseRoutes<AttributeController> {
    constructor() {
        super(new AttributeController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getPreferences),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.setPreference),
                AttributeRequest.guaranteeAttributeCreateRequest(),
                AttributeRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getPreferences),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.setPreference),
                AttributeRequest.guaranteeAttributeUpdateRequest(),
                AttributeRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.setPreference),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}