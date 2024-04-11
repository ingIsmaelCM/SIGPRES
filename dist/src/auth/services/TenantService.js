"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TenantRepository_1 = __importDefault(require("../repositories/TenantRepository"));
const BaseConnection_1 = __importDefault(require("@/app/db/BaseConnection"));
const MigrateTenant_1 = __importDefault(require("@/app/db/migrations/tenants/MigrateTenant"));
const Service_1 = __importDefault(require("@app/services/Service"));
const express_1 = require("express");
const tools_1 = __importDefault(require("@app/utils/tools"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class TenantService extends Service_1.default {
    tenantRepo = new TenantRepository_1.default();
    async getTenants(param) {
        try {
            return await this.tenantRepo.getAll(param);
        }
        catch (error) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async createTenant(data) {
        const trans = await BaseConnection_1.default.getTrans();
        try {
            data.key = new Date().getTime().toString();
            const newTenant = await this.tenantRepo.create(data, trans);
            const updated = await this.tenantRepo.update({
                ...newTenant,
                key: `sigpres_tenant_${newTenant.key}`,
            }, newTenant.id, trans);
            await new MigrateTenant_1.default(updated.key).createDatabase();
            await trans.commit();
            return updated;
        }
        catch (error) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async updateTenant(tenantId, data) {
        const trans = await BaseConnection_1.default.getTrans();
        try {
            const updatedTenant = await this.tenantRepo.update(data, tenantId, trans);
            await trans.commit();
            return updatedTenant;
        }
        catch (error) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async assignTenantToUser(tenantId, data) {
        const trans = await BaseConnection_1.default.getTrans();
        try {
            const tenant = await this.tenantRepo.findById(tenantId);
            if (!tenant) {
                return Promise.reject({
                    code: 404,
                    message: "No se encontró el inquilino"
                });
            }
            await tenant.setAuths(data.authIds, { transaction: trans });
            await trans.commit();
            return "Inquilinos asignados";
        }
        catch (error) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async switchTenant(tenantKey, res) {
        return this.safeRun(async () => {
            express_1.request.headers["tenant"] = tenantKey;
            tools_1.default.setCookie(res, "tenant", tenantKey);
            TenantConnection_1.default.initModels(TenantConnection_1.default.getConnection());
            return "Realizdo con éxito";
        });
    }
}
exports.default = TenantService;
//# sourceMappingURL=TenantService.js.map