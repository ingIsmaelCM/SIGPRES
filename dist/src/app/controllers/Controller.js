"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthor = setAuthor;
const express_1 = require("express");
const response_1 = __importDefault(require("../utils/response"));
const tools_1 = __importDefault(require("../utils/tools"));
class Controller {
    router = (0, express_1.Router)();
    async safeRun(method, res, code = 200, title) {
        try {
            return response_1.default.success(res, code, await method(), title || mensajesEstado[code]);
        }
        catch (error) {
            response_1.default.error(res, error.code, error.message, mensajesEstado[error.code || 500]);
            return error;
        }
    }
}
exports.default = Controller;
function setAuthor(_target, _propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (req, res) {
        req.body = tools_1.default.setUserRelated(req, req.body);
        return originalMethod.apply(this, [req, res]);
    };
}
const mensajesEstado = {
    200: "Operación realizada con éxito",
    201: "Recurso creado/actualizado",
    401: "No autorizado",
    403: "No tienes permiso para esto",
    404: "No encontrado",
    422: "Error de Validación",
    500: "Error interno del servidor"
};
//# sourceMappingURL=Controller.js.map