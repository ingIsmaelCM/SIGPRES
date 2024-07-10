import Service from "@app/services/Service";
import WhatsappManagement from "@source/services/WhatsappManagement";
import {MessageMedia} from "whatsapp-web.js";
import CloudinaryService from "@app/services/CloudinaryService";

export default class WhatsAppService extends Service {

    constructor() {
        super();

    }

    async startWhatsapp(authId: string) {
        return await this.safeRun(async () => {
            await WhatsappManagement.getClient(authId);
            return true;
        })
    }
    async endWhatsapp(authId: string) {
        return await this.safeRun(async () => {
           await  WhatsappManagement.removeClient(authId);
            return true;
        })
    }
    async sendMessage(authId: string, data: any) {
        return await this.safeRun(async () => {
            const client = await WhatsappManagement.getClient(authId);
            await client.sendMessage(`${data.to}@c.us`, data.text);
            return "Mensaje Enviado"
        })
    }
    async sendWsImage(authId: string, data: any) {
        return await this.safeRun(async () => {
            const client = await WhatsappManagement.getClient(authId);
            const image=await MessageMedia.fromUrl(data.image, {unsafeMime: true})
            await client.sendMessage(`${data.to}@c.us`, image);
            const res=data.image.split("/").pop().split(".")[0];
            await  CloudinaryService.getInstance().destroyFileFromCloudinary(res)
            return "Mensaje Enviado"
        })
    }
    async getClient(authId: string) {
        return await this.safeRun(async () => {
            return WhatsappManagement.checkClient(authId);
        })
    }
    async getUnreadMessages(authId: string) {
        return await this.safeRun(async () => {
            const client= await WhatsappManagement.getClient(authId);
            return await WhatsappManagement.getUnreadMessages(client);
        })
    }
}