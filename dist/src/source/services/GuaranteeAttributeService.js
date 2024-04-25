"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const GuaranteeAttributeRepository_1 = __importDefault(require("@source/repositories/GuaranteeAttributeRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class GuaranteeAttributeService extends Service_1.default {
    mainRepo = new GuaranteeAttributeRepository_1.default();
    async getGuaranteeAttributes(params) {
        return await this.mainRepo.getAll(params);
    }
    async findGuaranteeAttribute(guaranteeAttributeId, params) {
        return await this.mainRepo.findById(guaranteeAttributeId, params);
    }
    async createGuaranteeAttribute(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async updateGuaranteeAttribute(guaranteeAttributeId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async deleteGuaranteeAttribute(guaranteeAttributeId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async restoreGuaranteeAttribute(guaranteeAttributeId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
}
exports.default = GuaranteeAttributeService;
//# sourceMappingURL=GuaranteeAttributeService.js.map