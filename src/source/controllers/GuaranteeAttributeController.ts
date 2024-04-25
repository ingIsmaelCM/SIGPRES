import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import GuaranteeAttributeService from "@source/services/GuaranteeAttributeService";

export default class GuaranteeAttributeController extends Controller implements IController {
    prefix: string = 'guarantee_attributes';
    mainService = new GuaranteeAttributeService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getGuaranteeAttributes(req.query),
            res, 200, ""
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findGuaranteeAttribute(req.params.id, req.query),
            res, 200, ""
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createGuaranteeAttribute(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateGuaranteeAttribute(req.params.id, req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteGuaranteeAttribute(req.params.id),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreGuaranteeAttribute(req.params.id),
            res, 200, ""
        )
    }
}