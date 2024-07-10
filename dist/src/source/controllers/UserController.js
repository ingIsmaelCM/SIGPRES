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
const Controller_1 = __importStar(require("@app/controllers/Controller"));
const UserService_1 = __importDefault(require("@source/services/UserService"));
class UserController extends Controller_1.default {
    prefix = 'users';
    mainService = new UserService_1.default();
    async index(req, res) {
        return this.safeRun(async () => this.mainService.getUsers(req.query, req), res, 200, "Lista de Usuarios");
    }
    async indexAuthUsers(req, res) {
        return this.safeRun(async () => this.mainService.getAuthUsers(req.query), res, 200, "Lista de Usuarios Autenticables");
    }
    async show(req, res) {
        return this.safeRun(async () => this.mainService.findUser(req.params.id, req.query), res, 200, "Detalles del Usuario");
    }
    async store(req, res) {
        return this.safeRun(async () => this.mainService.createUser(req.body), res, 201, "Usuario Registrado");
    }
    async update(req, res) {
        return this.safeRun(async () => this.mainService.updateUser(req.body), res, 201, "Usuario actualizado");
    }
    async sendVerification(req, res) {
        return this.safeRun(async () => this.mainService.sendVerificationCode(req.body.email), res, 201, "Código de Verificación Enviado");
    }
    async delete(req, res) {
        return this.safeRun(async () => this.mainService.deleteUser(req.params.id), res, 200, "Usuario Eliminado");
    }
    async restore(req, res) {
        return this.safeRun(async () => this.mainService.restoreUser(req.params.id), res, 200, "Usuario Restaurado");
    }
}
exports.default = UserController;
__decorate([
    Controller_1.setAuthor,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "store", null);
__decorate([
    Controller_1.setAuthor,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
//# sourceMappingURL=UserController.js.map