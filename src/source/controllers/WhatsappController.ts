import Controller from "@app/controllers/Controller";
import {Request, Response} from "express";
import WhatsAppService from "@source/services/WhatsAppService";

export default class WhatsappController extends Controller {
    prefix = "messages/whatsapp"
    readonly mainService: WhatsAppService = new WhatsAppService();

    async startWS(req: any, res: Response) {
        return this.safeRun(async () =>
                this.mainService.startWhatsapp(req.auth.id)
            , res, 200, "Código Solicitado")
    }
    async endWS(req: any, res: Response) {
        return this.safeRun(async () =>
                this.mainService.endWhatsapp(req.auth.id)
            , res, 200, "Sesión Cerrada")
    }

    async sendMessage(req: any, res: Response){
        return this.safeRun(async () =>
                await this.mainService.sendMessage(req.auth.id, req.body)
            , res, 200, "Mensaje Enviado")
    }

    async getClient(req: any, res: Response){
        return this.safeRun(async () =>
                await this.mainService.getClient(req.auth.id)
            , res, 200, "Mensaje Enviado")
    }

}