import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import GuaranteeService from "@source/services/GuaranteeService";

export default class GuaranteeController extends Controller implements IController {
    prefix: string = 'guarantees';
    mainService = new GuaranteeService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getGuarantees(req.query),
            res, 200, "Garantías registradas"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findGuarantee(req.params.id, req.query),
            res, 200, "Detalles de la garantía"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createGuarantee(req.body),
            res, 201, "Garantía registrada"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateGuarantee(req.params.id, req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteGuarantee(req.params.id),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreGuarantee(req.params.id),
            res, 200, ""
        )
    }
}