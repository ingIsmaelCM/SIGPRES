import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import ClientContactService from "@source/services/ClientContactService";

export default class ClientContactController extends Controller implements IController {
    prefix: string = 'client_contacts';
    mainService = new ClientContactService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getClientContacts(req.query),
            res, 200, "Listado de Relación Cliente-Contacto"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createClientContact(req.body),
            res, 201, "Relación registrada"
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteFromRelation(Number(req.params.id))
            , res, 200, "Contacto Removido")
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreFromRelation(Number(req.params.id))
            , res, 200, "Contacto Restaurado")
    }

}