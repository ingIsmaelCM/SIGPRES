import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import ClientService from "../services/ClientService";
import InfoService from "@source/services/InfoService";
import {EInfoModels} from "@source/utils/SourceInterfaces";

export default class ClientController
    extends Controller
    implements IController {
    prefix: string = "clients";
    mainService = new ClientService();
    private infoService = new InfoService();

    async getClients(req: Request, res: Response) {
        await this.safeRun(async () =>
                await this.mainService.getClients(req.query),
            res, 200, "Lista de cliente");
    }

    async findClient(req: Request, res: Response) {
        await this.safeRun(async () =>
                await this.mainService.findClient(Number(req.params.id), req.query),
            res, 200, "Detalles del Cliente");
    }

    @setAuthor
    async createClient(req: Request, res: Response) {
        await this.safeRun(async () =>
                await this.mainService.createClient(req.body),
            res, 201, "Cliente Registrado");
    }

    @setAuthor
    async updateClient(req: Request, res: Response) {
        await this.safeRun(async () =>
                await this.mainService.updateClient(req.body, Number(req.params.id)),
            res, 201, "Cliente Actualizado");
    }

    @setAuthor
    async setClientInfo(req: Request, res: Response) {
        await this.safeRun(async () =>
                await this.infoService.addRelated(req.body,
                    EInfoModels.Client,
                    Number(req.params.id)),
            res, 201, "Información Registrada");
    }

    async deleteClient(req: Request, res: Response) {
        await this.safeRun(async () =>
                await this.mainService.deleteClient(Number(req.params.id)),
            res, 200, "Cliente Eliminado");
    }

    async restoreClient(req: Request, res: Response) {
        await this.safeRun(async () =>
                await this.mainService.restoreClient(Number(req.params.id)),
            res, 200, "Cliente Restaurado");
    }

    async setProfilePhoto(req: Request, res: Response) {
        await this.safeRun(async () =>
                await this.mainService.setProfilePhoto(req.body.images[0], Number(req.params.id)),
            res, 201, "Foto asignada al cliente")
    }

    async setClientImages(req: Request, res: Response) {
        return await this.safeRun(async () =>
                await this.mainService.setClientImages(req.body.images, Number(req.params.id)),
            res, 201, "Imágenes asignadas")
    }

    async setClientDocuments(req: Request, res: Response) {
        return await this.safeRun(async () =>
                await this.mainService.setClientDocuments(req.body.documents, Number(req.params.id)),
            res, 201, "Documento(s) Asignado(s)")
    }

}
