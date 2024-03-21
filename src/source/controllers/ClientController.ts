import Controller, {setAuthor} from "@/app/controllers/Controller";
import {Request, Response} from "express"
import IController from "@/app/controllers/IController";
import ClientService from "@source/services/ClientService";

export default class ClientController extends Controller implements IController {
    prefix: string = 'clients';
    mainService = new ClientService()


    async index(req: Request, res: Response) {
        //@ts-ignore
        return this.safeRun(async () =>
                this.mainService.getClients(req.query),
            res, 200, "Listado de clientes"
        )
    }

    async show(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.findClient(Number(req.params.id), req.query),
            res, 200, "Detalles del cliente"
        )
    }

    @setAuthor
    async store(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.createClient(req.body),
            res, 201, "Cliente registrado"
        )
    }

    @setAuthor
    async update(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.updateClient(Number(req.params.id), req.body),
            res, 201, "Cliente Actualizado"
        )
    }

    @setAuthor
    async setInfoToClient(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.setInfoToClient(Number(req.params.id), req.body),
            res, 201, "Información Actualizada"
        )
    }

    async setProfilePhoto(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.setProfilePhoto(Number(req.params.id), req.body),
            res, 201, "Foto de perfil añadida")
    }

    async delete(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.deleteClient(Number(req.params.id)),
            res, 200, "Cliente Eliminado"
        )
    }

    async restore(req: Request, res: Response) {
        return this.safeRun(async () =>
                this.mainService.restoreClient(Number(req.params.id)),
            res, 200, "Cliente Restaurado"
        )
    }
}