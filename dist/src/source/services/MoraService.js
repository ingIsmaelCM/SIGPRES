"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const MoraRepository_1 = __importDefault(require("@source/repositories/MoraRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class MoraService extends Service_1.default {
    mainRepo = new MoraRepository_1.default();
    async getMoras(params) {
        return await this.mainRepo.getAll(params);
    }
    async findMora(moraId, params) {
        return await this.mainRepo.findById(moraId, params);
    }
    async createMora(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async updateMora(moraId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async deleteMora(moraId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async restoreMora(moraId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
}
exports.default = MoraService;
//# sourceMappingURL=MoraService.js.map