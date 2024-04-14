"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = __importDefault(require("../services/AuthService"));
const Controller_1 = __importStar(require("@/app/controllers/Controller"));
class AuthController extends Controller_1.default {
    mainService = new AuthService_1.default();
    prefix = "auth";
    async registerAuth(req, res) {
        return await this.safeRun(async () => {
            return await this.mainService.createAuth(req.body);
        }, res, 201, "Cuenta registrada exitosamente");
    }
    async updateAuthInfo(req, res) {
        return await this.safeRun(async () => {
            return await this.mainService.updateAuthInfo(req.params.id, req.body);
        }, res, 201, "Perfil Actualizado Correctamente");
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
__decorate([
    Controller_1.setAuthor,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateAuthInfo", null);
//# sourceMappingURL=AuthController.js.map