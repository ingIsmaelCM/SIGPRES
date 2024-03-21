import BaseRoutes from "@app/routes/BaseRoutes";
import LoanController from "@source/controllers/LoanController";
import {Request, Response} from "express";
import LoanRequest from "@source/requests/LoanRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class LoanRoutes extends BaseRoutes<LoanController> {
    constructor() {
        super(new LoanController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getLoans),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createLoan),
                LoanRequest.loanCreateRequest(),
                LoanRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getLoans),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editLoan),
                LoanRequest.loanUpdateRequest(),
                LoanRequest.validate,
                (req: Request, res: Response) => this.controller.update(req, res)
            )
            .delete(
                RoleMiddleware.hasPermission(PermissionEnums.deleteLoan),
                (req: Request, res: Response) => this.controller.delete(req, res)
            )
            .patch(
                RoleMiddleware.hasPermission(PermissionEnums.restoreData),
                (req: Request, res: Response) => this.controller.restore(req, res)
            );
    }

}