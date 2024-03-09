import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request} from "express"
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

    async getClients(req: Request, res: any) {
        await this.safeRun(async () => {
            return await this.mainService.getClients(req.query);
        }, res, 200, "Lista de cliente");
    }

    async findClient(req: Request, res: any) {
        await this.safeRun(async () => {
            const clientId = req.params.id;
            const params = req.query;
            return await this.mainService.findClient(Number(clientId), params);
        }, res, 200, "Detalles del Cliente");
    }

    @setAuthor
    async createClient(req: Request, res: any) {
        await this.safeRun(async () => {
            return await this.mainService.createClient(req.body);
        }, res, 201, "Cliente Registrado");
    }

    @setAuthor
    async updateClient(req: Request, res: any) {
        await this.safeRun(async () => {
            const oldClient = req.body;
            const clientId = req.params.id;
            return await this.mainService.updateClient(oldClient, Number(clientId));
        }, res, 201, "Cliente Actualizado");
    }

    @setAuthor
    async setClientInfo(req: Request, res: any) {
        await this.safeRun(async () => {
            const info = req.body;
            const clientId = req.params.id;
            return await this.infoService.addRelated(info, EInfoModels.Client, Number(clientId));
        }, res, 201, "Información Registrada");
    }

    async deleteClient(req: Request, res: any) {
        await this.safeRun(async () => {
            const clientId = req.params.id;
            return await this.mainService.deleteClient(Number(clientId));
        }, res, 200, "Cliente Eliminado");
    }

    async restoreClient(req: Request, res: any) {
        await this.safeRun(async () => {
            const clientId = req.params.id;
            return await this.mainService.restoreClient(Number(clientId));
        }, res, 200, "Cliente Restaurado");
    }

    async setProfilePhoto(req: Request, res: any) {
        await this.safeRun(async () => {
            return await this.mainService.setProfilePhoto(req.body.images[0], Number(req.params.id))
        }, res, 201, "Foto asignada al cliente")
    }
}
