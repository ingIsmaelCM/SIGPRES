import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import PaymentService from "@source/services/PaymentService";

export default class PaymentController extends Controller implements IController {
    prefix: string = 'payments';
    mainService = new PaymentService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getPayments(req.query),
            res, 200, "Lista de pagos"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findPayment(req.params.id, req.query),
            res, 200, "Detalles del pago"
        )
    }

    async getPaymentStat(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getPaymentStats(req.query),
            res, 200, "Estadísticas de Pago"
        )
    }
    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createPayment(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async storePaymentCuota(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createPaymentCuotas(req.body),
            res, 201, "Pago Registrado Exitosamente"
        )
    }

    @setAuthor
    async storePaymentCapital(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createPaymentCapital(req.body),
            res, 201, "Pago Registrado Exitosamente"
        )
    }

    @setAuthor
    async storePaymentAbone(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createPaymentAbone(req.body),
            res, 201, "Abono Registrado Exitosamente"
        )
    }
    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updatePayment(req.params.id, req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deletePayment(req.params.id),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restorePayment(req.params.id),
            res, 200, ""
        )
    }
}