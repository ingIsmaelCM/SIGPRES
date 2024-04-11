import Service from "@app/services/Service";
import WhatsappManagement from "@source/services/WhatsappManagement";

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
            console.log(await client.getChats())
            await client.sendMessage(`${data.to}@c.us`, data.text);
            return "Mensaje Enviado"
        })
    }

    async getClient(authId: string) {
        return await this.safeRun(async () => {
            return WhatsappManagement.checkClient(authId);

        })
    }
}