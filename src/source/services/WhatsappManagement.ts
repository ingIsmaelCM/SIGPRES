import SocketService from "@app/services/SocketService";
import {Client, LocalAuth, Message} from "whatsapp-web.js";

export default class WhatsappManagement {
    private static socket: SocketService;
    private static readonly wsClients: Map<string, Client> = new Map();

    private constructor(authId: string) {
        try {
            if (!WhatsappManagement.socket) {
                WhatsappManagement.socket = new SocketService();
            }
            if (!WhatsappManagement.wsClients.has(authId)) {
                const client = new Client({
                    webVersionCache: {
                        type: 'remote',
                        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
                    },
                    qrMaxRetries: 3,
                    authStrategy: new LocalAuth({
                        clientId: authId
                    }),

                });
                if (client.info) {
                    client.logout().then();
                    client.destroy().then();
                }


                client.on('qr', (qr: string) => {
                    WhatsappManagement.socket.emit(`wsQrCode${authId}`, {authId: authId, qrCode: qr})
                    console.log('QR RECEIVED', qr);
                });

                client.on('ready', () => {
                    WhatsappManagement.wsClients.set(authId, client);
                    WhatsappManagement.socket.emit(`wsStarted${authId}`, {authId: authId})
                });
                client.on('message', (msg: Message) => {
                    if (msg.body == '!ping') {
                        msg.reply('pong');
                    }
                });
                client.initialize().then();
            }
        } catch (err: any) {
            throw {
                code: 500,
                message: err.message
            }
        }
    }

    static async getClient(authId: string): Promise<Client> {
        if (!WhatsappManagement.wsClients.has(authId)) {
            new WhatsappManagement(authId);
        }
        return WhatsappManagement.wsClients.get(authId)!
    }

    static async removeClient(authId: string) {
        const client = WhatsappManagement.wsClients.get(authId)!;
        await client.destroy();
        WhatsappManagement.wsClients.delete(authId)
    }

    static checkClient(authId: string) {
        return WhatsappManagement.wsClients.has(authId)
    }

}