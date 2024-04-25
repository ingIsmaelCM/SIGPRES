"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const GuaranteeRepository_1 = __importDefault(require("@source/repositories/GuaranteeRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class GuaranteeService extends Service_1.default {
    mainRepo = new GuaranteeRepository_1.default();
    async getGuarantees(params) {
        return await this.mainRepo.getAll(params);
    }
    async findGuarantee(guaranteeId, params) {
        return await this.mainRepo.findById(guaranteeId, params);
    }
    async createGuarantee(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const newGuarantee = await this.mainRepo.create(data, trans);
            await trans.commit();
            return newGuarantee;
        }, async () => await trans.rollback());
    }
    async updateGuarantee(guaranteeId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async deleteGuarantee(guaranteeId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async restoreGuarantee(guaranteeId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
}
exports.default = GuaranteeService;
//# sourceMappingURL=GuaranteeService.js.map