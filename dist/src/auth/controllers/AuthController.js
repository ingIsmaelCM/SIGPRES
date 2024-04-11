"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = __importDefault(require("../services/AuthService"));
const Controller_1 = __importDefault(require("@/app/controllers/Controller"));
class AuthController extends Controller_1.default {
    mainService = new AuthService_1.default();
    prefix = "auth";
    async registerAuth(req, res) {
        return await this.safeRun(async () => {
            return await this.mainService.createAuth(req.body);
        }, res, 201, "Cuenta registrada exitosamente");
    }
    async loginAuth(req, res) {
        return await this.safeRun(async () => await this.mainService.login(req.body, res), res, 200, "Sesión iniciada correctamente");
    }
    async verifyAuth(req, res) {
        return await this.safeRun(async () => {
            return await this.mainService.verifyAuth(req.body);
        }, res, 200, "Usuario verificado exitosamente");
    }
    async refreshToken(req, res) {
        return await this.safeRun(async () => await this.mainService.refreshToken(req, res), res, 200, "Token actualizado con éxito");
    }
    async logoutAuth(req, res) {
        return await this.safeRun(async () => await this.mainService.logout(res), res, 200, "Sesión cerrada exitosamente");
    }
    async logoutAllAuth(req, res) {
        return await this.safeRun(async () => await this.mainService.logoutAll(req, res), res, 200, "Se han cerrado todas las sesiones");
    }
    async resetPassword(req, res) {
        return this.safeRun(async () => {
            const updatedAuth = await this.mainService.resetPassword(req.auth.id, req.body.password);
            return await this.mainService.logoutAll(req, res);
        }, res, 201, "Contraseña Actualizada");
    }
    async sendRecoverLink(req, res) {
        return await this.safeRun(async () => await this.mainService.sendRecoverLink(req.body.email), res, 200, "Correo de recuperación enviado");
    }
    async sendVerificationCode(req, res) {
        return await this.safeRun(async () => await this.mainService.sendVerificationCode(req.body.email), res, 200, "Correo de verificación enviado");
    }
    async unAuthorize(req, res) {
        return this.safeRun(async () => this.mainService.unAuthorizeUser(req.params.id), res, 201, "Código de desautorizado");
    }
    async recoverPassword(req, res) {
        return await this.safeRun(async () => await this.mainService.recoverPassword(req.body, res), res, 200, "Código Verificado correctamente");
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map