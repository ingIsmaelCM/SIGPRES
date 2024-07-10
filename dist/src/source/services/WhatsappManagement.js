"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SocketService_1 = __importDefault(require("@app/services/SocketService"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
class WhatsappManagement {
    static socket;
    static wsClients = new Map();
    constructor(tenantId) {
    }
    static async createClient(tenantId) {
        try {
            if (!WhatsappManagement.socket) {
                WhatsappManagement.socket = new SocketService_1.default();
            }
            if (!WhatsappManagement.wsClients.has(tenantId)) {
                const client = new whatsapp_web_js_1.Client({
                    webVersionCache: {
                        type: 'remote',
                        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
                    },
                    qrMaxRetries: 3,
                    authStrategy: new whatsapp_web_js_1.LocalAuth({
                        clientId: tenantId
                    }),
                });
                if (client.info) {
                    WhatsappManagement.wsClients.set(tenantId, client);
                }
                else {
                    client.on('qr', (qr) => {
                        WhatsappManagement.socket.emit(`wsQrCode${tenantId}`, { tenantId: tenantId, qrCode: qr });
                        console.log(qr, tenantId);
                    });
                    client.on('ready', () => {
                        WhatsappManagement.wsClients.set(tenantId, client);
                        WhatsappManagement.socket.emit(`wsStarted${tenantId}`, { tenantId: tenantId });
                    });
                    client.on('message', async (msg) => {
                        let messages = await this.getUnreadMessages(client);
                        WhatsappManagement.socket.emit(`updateMessages${tenantId}`, { tenantId: tenantId, messages: messages });
                    });
                    client.on('message_ack', async (msg) => {
                        let messages = await this.getUnreadMessages(client);
                        WhatsappManagement.socket.emit(`updateMessages${tenantId}`, { tenantId: tenantId, messages: messages });
                        if (msg.body == '!ping') {
                            msg.reply('pong');
                        }
                    });
                    await client.initialize();
                }
            }
        }
        catch (err) {
            throw {
                code: 500,
                message: err.message
            };
        }
    }
    static async getUnreadMessages(client) {
        let chats = (await client.getChats().then((allChats) => allChats.filter((chat) => chat.unreadCount > 0)));
        let messages = [];
        for (const chat of chats) {
            const message = await chat.fetchMessages({ limit: chat.unreadCount })
                .then((msgs) => msgs
                .filter((msg) => msg.body)
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((msg) => {
                return {
                    from: msg.from,
                    to: msg.to,
                    body: msg.body,
                    timestamp: msg.timestamp,
                };
            }));
            messages.push(...message);
        }
        return messages;
    }
    static async getClient(tenantId) {
        if (!WhatsappManagement.wsClients.has(tenantId)) {
            await WhatsappManagement.createClient(tenantId);
        }
        return WhatsappManagement.wsClients.get(tenantId);
    }
    static async removeClient(tenantId) {
        const client = WhatsappManagement.wsClients.get(tenantId);
        await client.destroy();
        WhatsappManagement.wsClients.delete(tenantId);
    }
    static checkClient(tenantId) {
        return WhatsappManagement.wsClients.has(tenantId);
    }
}
exports.default = WhatsappManagement;
//# sourceMappingURL=WhatsappManagement.js.map