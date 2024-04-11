"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = __importDefault(require("@app/middlewares/Middleware"));
const response_1 = __importDefault(require("@app/utils/response"));
const WhatsappManagement_1 = __importDefault(require("@source/services/WhatsappManagement"));
class WhatsappMiddleware extends Middleware_1.default {
    hasClient(req, res, next) {
        if (WhatsappManagement_1.default.checkClient(req.auth.id)) {
            next();
        }
        else {
            response_1.default.error(res, 419, 'No ha iniciado un cliente de whatsapp', "No autorizado");
            return;
        }
    }
}
exports.default = new WhatsappMiddleware();
//# sourceMappingURL=WhatsappMiddleware.js.map