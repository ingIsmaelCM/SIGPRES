import Controller, { setAuthor } from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import LoanService from "../services/LoanService";
import { Request, Response } from "express";

export default class LoanController extends Controller implements IController {
  prefix: string = "loans";
  mainService = new LoanService();

  async getLoans(req: Request, res: Response) {
    await this.safeRun(async () => {
      return await this.mainService.getLoans(req.query);
    }, res, 200, "Listado de préstamos");
  }

  @setAuthor
  async createLoan(req: Request, res: Response) {
    await this.safeRun(async () => {
      return await this.mainService.createLoan(req.body);
    }, res, 201, "Préstamo registrado");
  }
}
