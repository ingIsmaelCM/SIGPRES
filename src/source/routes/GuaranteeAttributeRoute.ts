import BaseRoutes from "@app/routes/BaseRoutes";
import GuaranteeAttributeController from "@source/controllers/GuaranteeAttributeController";
import {Request, Response} from "express";
import GuaranteeAttributeRequest from "@source/requests/GuaranteeAttributeRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/interfaces/PermissionEnums";

export default class GuaranteeAttributeRoutes extends BaseRoutes<GuaranteeAttributeController> {
    constructor() {
        super(new GuaranteeAttributeController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getPreferences),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.setPreference),
                GuaranteeAttributeRequest.guaranteeAttributeCreateRequest(),
                GuaranteeAttributeRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getPreferences),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.setPreference),
                GuaranteeAttributeRequest.guaranteeAttributeUpdateRequest(),
                GuaranteeAttributeRequest.validate,
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