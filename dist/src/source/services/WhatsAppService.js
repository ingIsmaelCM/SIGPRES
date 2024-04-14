"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const WhatsappManagement_1 = __importDefault(require("@source/services/WhatsappManagement"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const CloudinaryService_1 = __importDefault(require("@app/services/CloudinaryService"));
class WhatsAppService extends Service_1.default {
    constructor() {
        super();
    }
    async startWhatsapp(authId) {
        return await this.safeRun(async () => {
            await WhatsappManagement_1.default.getClient(authId);
            return true;
        });
    }
    async endWhatsapp(authId) {
        return await this.safeRun(async () => {
            await WhatsappManagement_1.default.removeClient(authId);
            return true;
        });
    }
    async sendMessage(authId, data) {
        return await this.safeRun(async () => {
            const client = await WhatsappManagement_1.default.getClient(authId);
            await client.sendMessage(`${data.to}@c.us`, data.text);
            return "Mensaje Enviado";
        });
    }
    async sendWsImage(authId, data) {
        return await this.safeRun(async () => {
            const client = await WhatsappManagement_1.default.getClient(authId);
            const image = await whatsapp_web_js_1.MessageMedia.fromUrl(data.image, { unsafeMime: true });
            await client.sendMessage(`${data.to}@c.us`, image);
            const res = data.image.split("/").pop().split(".")[0];
            await CloudinaryService_1.default.getInstance().destroyFileFromCloudinary(res);
            return "Mensaje Enviado";
        });
    }
    async getClient(authId) {
        return await this.safeRun(async () => {
            return WhatsappManagement_1.default.checkClient(authId);
        });
    }
    async getUnreadMessages(authId) {
        return await this.safeRun(async () => {
            const client = await WhatsappManagement_1.default.getClient(authId);
            return await WhatsappManagement_1.default.getUnreadMessages(client);
        });
    }
}
exports.default = WhatsAppService;
//# sourceMappingURL=WhatsAppService.js.map