import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request} from "express"
import IController from "@/app/controllers/IController";
import ContactService from "@source/services/ContactService";
import InfoService from "@source/services/InfoService";
import {EInfoModels} from "@source/utils/SourceInterfaces";

export default class ContactController extends Controller implements IController {
    prefix: string = "contacts";
    mainService = new ContactService();
    infoService = new InfoService();

    async getContacts(req: Request, res: any) {
        return await this.safeRun(async () =>
                await this.mainService.getContacts(req.query),
            res, 200, "Lista de contactos")
    }

    async findContact(req: Request, res: any) {
        return await this.safeRun(async () =>
                await this.mainService.findContact(Number(req.params.id), req.query),
            res, 200, "Detalles del contacto")
    }

    @setAuthor
    async createContact(req: Request, res: any) {
        return await this.safeRun(async () =>
                await this.mainService.createContact(req.body),
            res, 201, "Contacto Registrado")
    }

    @setAuthor
    async setContactInfo(req: Request, res: any) {
        return await this.safeRun(async () =>
                await this.infoService.addRelated(req.body,
                    EInfoModels.Contact,
                    Number(req.params.id)),
            res, 201, "Información Registrada"
        )
    }

    @setAuthor
    async updateContact(req: Request, res: any) {
        return await this.safeRun(async () =>
                await this.mainService.updateContact(req.body, Number(req.params.id)),
            res, 201, "Contacto Actualizado"
        )
    }

    async deleteContact(req: Request, res: any) {
        return await this.safeRun(async () =>
                await this.mainService.deleteContact(Number(req.params.id)),
            res, 200, "Contacto Eliminado")
    }

    async restoreContact(req: Request, res: any) {
        return await this.safeRun(async () =>
                await this.mainService.restoreContact(Number(req.params.id)),
            res, 200, "Contacto Restaurado")
    }

    async setProfilePhoto(req: Request, res: any) {
        await this.safeRun(async () => {
            return await this.mainService.setProfilePhoto(req.body.images[0], Number(req.params.id))
        }, res, 201, "Foto asignada al cliente")
    }
}