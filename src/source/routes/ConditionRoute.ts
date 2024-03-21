import BaseRoutes from "@app/routes/BaseRoutes";
import ConditionController from "@source/controllers/ConditionController";
import {Request, Response} from "express";
import ConditionRequest from "@source/requests/ConditionRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class ConditionRoutes extends BaseRoutes<ConditionController> {
    constructor() {
        super(new ConditionController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getConditions),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createCondition),
                ConditionRequest.conditionCreateRequest(),
                ConditionRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getConditions),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editCondition),
                ConditionRequest.conditionUpdateRequest(),
                ConditionRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteCondition),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}