import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import LawyerService from "@source/services/LawyerService";

export default class LawyerController extends Controller implements IController {
    prefix: string = 'lawyers';
    mainService = new LawyerService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getLawyers(req.query),
            res, 200, ""
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findLawyer(Number(req.params.id), req.query),
            res, 200, ""
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createLawyer(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateLawyer(Number(req.params.id), req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteLawyer(Number(req.params.id)),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreLawyer(Number(req.params.id)),
            res, 200, ""
        )
    }
}