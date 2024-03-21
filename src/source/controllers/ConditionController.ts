import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import ConditionService from "@source/services/ConditionService";

export default class ConditionController extends Controller implements IController {
    prefix: string = 'conditions';
    mainService = new ConditionService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getConditions(req.query),
            res, 200, ""
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findCondition(Number(req.params.id), req.query),
            res, 200, ""
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createCondition(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateCondition(Number(req.params.id), req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteCondition(Number(req.params.id)),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreCondition(Number(req.params.id)),
            res, 200, ""
        )
    }
}