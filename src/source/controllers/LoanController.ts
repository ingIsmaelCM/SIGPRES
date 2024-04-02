import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import LoanService from "@source/services/LoanService";

export default class LoanController extends Controller implements IController {
    prefix: string = 'loans';
    mainService = new LoanService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getLoans(req.query),
            res, 200, "Listado de préstamos"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findLoan(req.params.id, req.query),
            res, 200, "Detalles del préstamo"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createLoan(req.body),
            res, 201, "Solicitud Registrada"
        )
    }

    @setAuthor
    async confirm(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.confirmLoan(req.params.id, req.body),
            res, 201, "Solicitud Confirmada"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateLoan(req.params.id, req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteLoan(req.params.id),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreLoan(req.params.id),
            res, 200, ""
        )
    }
}