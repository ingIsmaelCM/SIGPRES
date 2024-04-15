import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import ExpenseService from "@source/services/ExpenseService";

export default class ExpenseController extends Controller implements IController {
    prefix: string = 'expenses';
    mainService = new ExpenseService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getExpenses(req.query),
            res, 200, "Registro de gastos"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findExpense(req.params.id, req.query),
            res, 200, "Detalles del gasto"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createExpense(req.body),
            res, 201, "Gasto registrado"
        )
    }

    @setAuthor
    async storeFromLawyer(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createExpenseFromLawyer(req.body),
            res, 201, "Honorarios pagados"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateExpense(req.params.id, req.body),
            res, 201, "Gasto actualizado"
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteExpense(req.params.id),
            res, 200, "Gasto elimiado correctamente"
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreExpense(req.params.id),
            res, 200, "Gasto restaurado correctamente"
        )
    }
}