"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("@app/controllers/Controller"));
const WhatsAppService_1 = __importDefault(require("@source/services/WhatsAppService"));
class WhatsappController extends Controller_1.default {
    prefix = "messages/whatsapp";
    mainService = new WhatsAppService_1.default();
    async startWS(req, res) {
        return this.safeRun(async () => this.mainService.startWhatsapp(req.cookies.tenant), res, 200, "Código Solicitado");
    }
    async endWS(req, res) {
        return this.safeRun(async () => this.mainService.endWhatsapp(req.cookies.tenant), res, 200, "Sesión Cerrada");
    }
    async sendMessage(req, res) {
        return this.safeRun(async () => await this.mainService.sendMessage(req.cookies.tenant, req.body), res, 200, "Mensaje Enviado");
    }
    async sendImage(req, res) {
        return this.safeRun(async () => await this.mainService.sendWsImage(req.cookies.tenant, req.body), res, 200, "Mensaje Enviado");
    }
    async getClient(req, res) {
        return this.safeRun(async () => await this.mainService.getClient(req.cookies.tenant), res, 200, "Mensaje Enviado");
    }
    async getUnreadMessages(req, res) {
        return this.safeRun(async () => await this.mainService.getUnreadMessages(req.cookies.tenant), res, 200, "Lista de Mensajes");
    }
}
exports.default = WhatsappController;
//# sourceMappingURL=WhatsappController.js.map