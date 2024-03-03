import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import LoanService from "../services/LoanService";
import { Request, Response } from "express";
import response from "@/app/utils/response";
import LoanRoutes from "../routes/LoanRoutes";

export default class LoanController extends Controller implements IController {
  prefix: string = "loans";
  loanService = new LoanService();

  constructor() {
    super();
    new LoanRoutes(this.router, this).initRoutes();
  }

  async getLoans(req: Request, res: Response) {
    this.safeRun(async () => {
      const loans = await this.loanService.getLoans(req.query);
      response.success(res, 200, loans, "Listado de préstamos");
    }, res);
  }
}
