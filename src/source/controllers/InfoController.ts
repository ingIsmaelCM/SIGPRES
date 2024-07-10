import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import InfoService from "@source/services/InfoService";

export default class InfoController extends Controller implements IController {
    prefix: string = 'infos';
    mainService = new InfoService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getInfos(req.query),
            res, 200, "Registro de Informaciones"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findInfo(req.params.id, req.query),
            res, 200, "Detalles de la información"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createInfo(req.body),
            res, 201, "Información Registrada con Éxito"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateInfo(req.params.id, req.body),
            res, 201, "Información Actualizada"
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteInfo(req.params.id),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreInfo(req.params.id),
            res, 200, ""
        )
    }
}