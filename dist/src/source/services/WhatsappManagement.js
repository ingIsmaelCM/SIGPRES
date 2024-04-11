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
    constructor(authId) {
        try {
            if (!WhatsappManagement.socket) {
                WhatsappManagement.socket = new SocketService_1.default();
            }
            if (!WhatsappManagement.wsClients.has(authId)) {
                const client = new whatsapp_web_js_1.Client({
                    webVersionCache: {
                        type: 'remote',
                        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
                    },
                    qrMaxRetries: 3,
                    authStrategy: new whatsapp_web_js_1.LocalAuth({
                        clientId: authId
                    }),
                });
                if (client.info) {
                    client.logout().then();
                    client.destroy().then();
                }
                client.on('qr', (qr) => {
                    WhatsappManagement.socket.emit(`wsQrCode${authId}`, { authId: authId, qrCode: qr });
                    console.log('QR RECEIVED', qr);
                });
                client.on('ready', () => {
                    WhatsappManagement.wsClients.set(authId, client);
                    WhatsappManagement.socket.emit(`wsStarted${authId}`, { authId: authId });
                });
                client.on('message', (msg) => {
                    if (msg.body == '!ping') {
                        msg.reply('pong');
                    }
                });
                client.initialize().then();
            }
        }
        catch (err) {
            throw {
                code: 500,
                message: err.message
            };
        }
    }
    static async getClient(authId) {
        if (!WhatsappManagement.wsClients.has(authId)) {
            new WhatsappManagement(authId);
        }
        return WhatsappManagement.wsClients.get(authId);
    }
    static async removeClient(authId) {
        const client = WhatsappManagement.wsClients.get(authId);
        await client.destroy();
        WhatsappManagement.wsClients.delete(authId);
    }
    static checkClient(authId) {
        return WhatsappManagement.wsClients.has(authId);
    }
}
exports.default = WhatsappManagement;
//# sourceMappingURL=WhatsappManagement.js.map