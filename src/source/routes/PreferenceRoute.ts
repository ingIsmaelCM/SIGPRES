import BaseRoutes from "@app/routes/BaseRoutes";
import PreferenceController from "@source/controllers/PreferenceController";
import {Request, Response} from "express";
import PreferenceRequest from "@source/requests/PreferenceRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class PreferenceRoutes extends BaseRoutes<PreferenceController> {
    constructor() {
        super(new PreferenceController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getPreferences),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.setPreference),
                PreferenceRequest.preferenceCreateRequest(),
                PreferenceRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:key")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getPreferences),
                (req: Request, res: Response) => this.controller.show(req, res)
            )

    }

}