import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import ContactService from "@source/services/ContactService";

export default class ContactController extends Controller implements IController {
    prefix: string = 'contacts';
    mainService = new ContactService()


    async index(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.getContacts(req.query),
            res, 200, "Lista de contactos"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findContact(Number(req.params.id), req.query),
            res, 200, "Detalles del contacto"
        )
    }

    async fromRelation(req: Request, res: Response){
        return this.safeRun(async () =>
                this.mainService.getContactFromRelation(req.query),
            res, 200, "Lista de contactos desde relación"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createContact(req.body),
            res, 201, "Contacto registrado"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateContact(Number(req.params.id), req.body),
            res, 201, "Contacto actualizado"
        )
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteContact(Number(req.params.id)),
            res, 200, "Contacto eliminado"
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreContact(Number(req.params.id)),
            res, 200, "Contacto restaurado"
        )
    }
}