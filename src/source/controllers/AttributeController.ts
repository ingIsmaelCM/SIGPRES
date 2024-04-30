import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import AttributeService from "@source/services/AttributeService";

export default class AttributeController extends Controller implements IController {
    prefix: string = 'attributes';
    mainService = new AttributeService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getAttributes(req.query),
            res, 200, "Listados de Atributos"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findAttribute(req.params.id, req.query),
            res, 200, "Detalles del atributo"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createAttribute(req.body),
            res, 201, "Atributo Registrado"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateAttribute(req.params.id, req.body),
            res, 201, ""
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteAttribute(req.params.id),
            res, 200, ""
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreAttribute(req.params.id),
            res, 200, ""
        )
    }
}