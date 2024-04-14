"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const WhatsappController_1 = __importDefault(require("@source/controllers/WhatsappController"));
const WhatsappMiddleware_1 = __importDefault(require("@auth/middlewares/WhatsappMiddleware"));
const WhatsappRequest_1 = __importDefault(require("@source/requests/WhatsappRequest"));
class WhatsappRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new WhatsappController_1.default());
    }
    initRoutes() {
        this.controller.router
            .get('/', (req, res) => this.controller.getClient(req, res));
        this.controller.router
            .get('/unread', WhatsappMiddleware_1.default.hasClient, (req, res) => this.controller.getUnreadMessages(req, res));
        this.controller.router
            .post('/start', (req, res) => this.controller.startWS(req, res));
        this.controller.router
            .post('/end', WhatsappMiddleware_1.default.hasClient, (req, res) => this.controller.endWS(req, res));
        this.controller.router
            .post('/send/text', WhatsappMiddleware_1.default.hasClient, WhatsappRequest_1.default.textMessageRequest(), WhatsappRequest_1.default.validate, (req, res) => this.controller.sendMessage(req, res));
        this.controller.router
            .post('/send/image', WhatsappMiddleware_1.default.hasClient, WhatsappRequest_1.default.imageMesageRequest(), WhatsappRequest_1.default.validate, (req, res) => this.controller.sendImage(req, res));
    }
}
exports.default = WhatsappRoutes;
//# sourceMappingURL=WhatsappRoute.js.map