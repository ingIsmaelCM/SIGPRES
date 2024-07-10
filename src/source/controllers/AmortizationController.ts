import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import AmortizationService from "@source/services/AmortizationService";

export default class AmortizationController extends Controller implements IController {
    prefix: string = 'amortizations';
    mainService = new AmortizationService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getAmortizations(req.query),
            res, 200, "Lista de amortizaciones"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findAmortization(req.params.id, req.query),
            res, 200, "Detalles de la Amortización"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createAmortization(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateAmortization(req.params.id, req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteAmortization(req.params.id),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreAmortization(req.params.id),
            res, 200, ""
        )
    }
}