import BaseRoutes from "@app/routes/BaseRoutes";
import LawyerPaymentController from "@source/controllers/LawyerPaymentController";
import {Request, Response} from "express";
import LawyerPaymentRequest from "@source/requests/LawyerPaymentRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class LawyerPaymentRoutes extends BaseRoutes<LawyerPaymentController> {
    constructor() {
        super(new LawyerPaymentController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getExpenses),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createExpense),
                LawyerPaymentRequest.lawyerPaymentCreateRequest(),
                LawyerPaymentRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getExpenses),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editExpense),
                LawyerPaymentRequest.lawyerPaymentUpdateRequest(),
                LawyerPaymentRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteExpense),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}