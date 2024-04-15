import BaseRoutes from "@app/routes/BaseRoutes";
import ExpenseController from "@source/controllers/ExpenseController";
import {Request, Response} from "express";
import ExpenseRequest from "@source/requests/ExpenseRequest";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@app/interfaces/PermissionEnums";

export default class ExpenseRoutes extends BaseRoutes<ExpenseController> {
    constructor() {
        super(new ExpenseController());
    }

    initRoutes(): void {
        this.controller.router.route("/")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getExpenses),
                (req: Request, res: Response) => this.controller.index(req, res)
            )
            .post(
                RoleMiddleware.hasPermission(PermissionEnums.createExpense),
                ExpenseRequest.expenseCreateRequest(),
                ExpenseRequest.validate,
                (req: Request, res: Response) => this.controller.store(req, res)
            );

        this.controller.router.post('/lawyer',
            RoleMiddleware.hasPermission(PermissionEnums.createExpense),
            ExpenseRequest.expenseCreateRequest(),
            ExpenseRequest.expenseCreateFromLawyerRequest(),
            ExpenseRequest.validate,
            (req: Request, res: Response) => this.controller.storeFromLawyer(req, res)
            )

        this.controller.router.route("/:id")
            .get(
                RoleMiddleware.hasPermission(PermissionEnums.getExpenses),
                (req: Request, res: Response) => this.controller.show(req, res)
            )
            .put(
                RoleMiddleware.hasPermission(PermissionEnums.editExpense),
                ExpenseRequest.expenseUpdateRequest(),
                ExpenseRequest.validate,
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