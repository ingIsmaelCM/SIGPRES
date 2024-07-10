"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("@/app/controllers/Controller"));
const TenantService_1 = __importDefault(require("../services/TenantService"));
class TenantController extends Controller_1.default {
    prefix = "tenants";
    mainService = new TenantService_1.default();
    async getTenants(req, res) {
        await this.safeRun(async () => {
            const params = req.query;
            return await this.mainService.getTenants(params);
        }, res, 200, "Inquilinos del sistema");
    }
    async createTenant(req, res) {
        await this.safeRun(async () => {
            const data = req.body;
            return await this.mainService.createTenant(data);
        }, res, 201, "Nuevo Inquilino");
    }
    async updateTenant(req, res) {
        await this.safeRun(async () => {
            const data = req.body;
            const tenantId = req.params.id;
            return await this.mainService.updateTenant(tenantId, data);
        }, res, 201, "Inquilino actualizado");
    }
    async assignToUser(req, res) {
        await this.safeRun(async () => {
            return await this.mainService.assignTenantToUser(req.params.id, req.body);
        }, res, 201, "Inquilino asignado");
    }
    async switchTenant(req, res) {
        await this.safeRun(async () => {
            return await this.mainService.switchTenant(req.body.tenant, res);
        }, res, 201, "Inquilino Cambiado");
    }
}
exports.default = TenantController;
//# sourceMappingURL=TenantController.js.map