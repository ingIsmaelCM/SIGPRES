import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import PreferenceService from "@source/services/PreferenceService";

export default class PreferenceController extends Controller implements IController {
    prefix: string = 'preferences';
    mainService = new PreferenceService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getPreferences(req.query),
            res, 200, ""
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getPreference(req.params.key, req.query),
            res, 200, ""
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.setPreference(req.body),
            res, 201, ""
        )
    }


}