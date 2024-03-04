import AbstractRoutes from "@/app/routes/AbstractRoutes";
import LoanController from "../controllers/LoanController";
import RoleMiddleware from "@/auth/middlewares/RoleMiddleware";
import PermissionEnums from "@/app/utils/PermissionEnums";
import { Request, Response } from "express";
import LoanRequest from "../middlewares/LoanRequest";
import ConditionRequest from "../middlewares/ConditionRequest";

export default class LoanRoutes extends AbstractRoutes<LoanController> {
  initRoutes(): void {
    this.router
      .route("/")
      .get(
        RoleMiddleware.hasPermission(PermissionEnums.getLoan),
        (req: Request, res: Response) => this.controller.getLoans(req, res)
      )
      .post(
        RoleMiddleware.hasPermission(PermissionEnums.createLoan),
        LoanRequest.createLoanRequest(),
        ConditionRequest.createConditionRequest(),
        LoanRequest.validate,
        (req: Request, res: Response) => this.controller.createLoan(req, res)
      );
  }
}
