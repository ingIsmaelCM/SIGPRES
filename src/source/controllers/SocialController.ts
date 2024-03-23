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
            res, 200, "Listado de Redes Sociales"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findSocial(Number(req.params.id), req.query),
            res, 200, "Detalles de redes sociales"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createSocial(req.body),
            res, 201, "Redes sociales registradas"
        )
    }

}