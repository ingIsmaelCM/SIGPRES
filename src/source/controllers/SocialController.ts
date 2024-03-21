import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import SocialService from "@source/services/SocialService";

export default class SocialController extends Controller implements IController {
    prefix: string = 'socials';
    mainService = new SocialService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getSocials(req.query),
            res, 200, ""
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findSocial(Number(req.params.id), req.query),
            res, 200, ""
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createSocial(req.body),
            res, 201, ""
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateSocial(Number(req.params.id), req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteSocial(Number(req.params.id)),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreSocial(Number(req.params.id)),
            res, 200, ""
        )
    }
}