import BaseRoutes from "@app/routes/BaseRoutes";
import GuaranteeController from "@source/controllers/GuaranteeController";
import {Request, Response} from "express";
import GuaranteeRequest from "@source/requests/GuaranteeRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/interfaces/PermissionEnums";

export default class GuaranteeRoutes extends BaseRoutes<GuaranteeController> {
    constructor() {
        super(new GuaranteeController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getGuarantees),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createGuarantee),
                GuaranteeRequest.guaranteeCreateRequest(),
                GuaranteeRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getGuarantees),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editGuarantee),
                GuaranteeRequest.guaranteeUpdateRequest(),
                GuaranteeRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteGuarantee),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}