import BaseRoutes from "@app/routes/BaseRoutes";
import AmortizationController from "@source/controllers/AmortizationController";
import {Request, Response} from "express";
import AmortizationRequest from "@source/requests/AmortizationRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class AmortizationRoutes extends BaseRoutes<AmortizationController> {
    constructor() {
        super(new AmortizationController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getAmortizations),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createAmortization),
                AmortizationRequest.amortizationCreateRequest(),
                AmortizationRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getAmortizations),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editAmortization),
                AmortizationRequest.amortizationUpdateRequest(),
                AmortizationRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteAmortization),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
           ;
    }

}