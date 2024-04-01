import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import LawyerPaymentService from "@source/services/LawyerPaymentService";

export default class LawyerPaymentController extends Controller implements IController {
    prefix: string = 'lawyerPayments';
    mainService = new LawyerPaymentService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getLawyerPayments(req.query),
            res, 200, "Lista de pagos a abogados"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findLawyerPayment(Number(req.params.id), req.query),
            res, 200, "Detalles del pago"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createLawyerPayment(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateLawyerPayment(Number(req.params.id), req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteLawyerPayment(Number(req.params.id)),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreLawyerPayment(Number(req.params.id)),
            res, 200, ""
        )
    }
}