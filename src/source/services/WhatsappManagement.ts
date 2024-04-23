import SocketService from "@app/services/SocketService";
import {Client, LocalAuth, Message, Chat} from "whatsapp-web.js";

export default class WhatsappManagement {
    private static socket: SocketService;
    private static readonly wsClients: Map<string, Client> = new Map();

    private constructor(tenantId: string) {

    }

    private static async createClient(tenantId: string) {
        try {
            if (!WhatsappManagement.socket) {
                WhatsappManagement.socket = new SocketService();
            }
            if (!WhatsappManagement.wsClients.has(tenantId)) {
                const client = new Client({
                    webVersionCache: {
                        type: 'remote',
                        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
                    },
                    qrMaxRetries: 3,
                    authStrategy: new LocalAuth({
                        clientId: tenantId
                    }),
                });
                if (client.info) {
                    WhatsappManagement.wsClients.set(tenantId, client);
                } else {
                    client.on('qr', (qr: string) => {
                        WhatsappManagement.socket.emit(`wsQrCode${tenantId}`, {tenantId: tenantId, qrCode: qr});
                        console.log(qr, tenantId)
                    });
                    client.on('ready', () => {
                        WhatsappManagement.wsClients.set(tenantId, client);
                        WhatsappManagement.socket.emit(`wsStarted${tenantId}`, {tenantId: tenantId})
                    });

                    client.on('message', async (msg: Message) => {
                        let messages = await this.getUnreadMessages(client);
                        WhatsappManagement.socket.emit(`updateMessages${tenantId}`,
                            {tenantId: tenantId, messages: messages})
                    });
                    client.on('message_ack', async (msg: Message) => {
                        let messages = await this.getUnreadMessages(client);
                        WhatsappManagement.socket.emit(`updateMessages${tenantId}`,
                            {tenantId: tenantId, messages: messages})
                        if (msg.body == '!ping') {
                            msg.reply('pong');
                        }
                    });

                    await client.initialize();
                }


            }
        } catch (err: any) {
            throw {
                code: 500,
                message: err.message
            }
        }
    }

    static async getUnreadMessages(client: Client) {
        let chats = (await client.getChats().then((allChats: Chat[]) =>
            allChats.filter((chat: Chat) => chat.unreadCount > 0)
        ));
        let messages: Message[] = [];
        for (const chat of chats) {
            const message = await chat.fetchMessages({limit: chat.unreadCount})
                .then((msgs: Message[]) => msgs
                    .filter((msg: Message) => msg.body)
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .map((msg: Message) => {
                        return {
                            from: msg.from,
                            to: msg.to,
                            body: msg.body,
                            timestamp: msg.timestamp,
                        } as Message
                    }));
            messages.push(...message)
        }
        return messages;
    }

    static async getClient(tenantId: string): Promise<Client> {
        if (!WhatsappManagement.wsClients.has(tenantId)) {
            await WhatsappManagement.createClient(tenantId);
        }
        return WhatsappManagement.wsClients.get(tenantId)!
    }

    static async removeClient(tenantId: string) {
        const client = WhatsappManagement.wsClients.get(tenantId)!;
        await client.destroy();
        WhatsappManagement.wsClients.delete(tenantId)
    }

    static checkClient(tenantId: string) {
        return WhatsappManagement.wsClients.has(tenantId)
    }

}