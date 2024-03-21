import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import MoraService from "@source/services/MoraService";

export default class MoraController extends Controller implements IController {
    prefix: string = 'moras';
    mainService = new MoraService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getMoras(req.query),
            res, 200, ""
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findMora(Number(req.params.id), req.query),
            res, 200, ""
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createMora(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateMora(Number(req.params.id), req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteMora(Number(req.params.id)),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreMora(Number(req.params.id)),
            res, 200, ""
        )
    }
}