"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const AttributeRepository_1 = __importDefault(require("@source/repositories/AttributeRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class AttributeService extends Service_1.default {
    mainRepo = new AttributeRepository_1.default();
    async getAttributes(params) {
        return await this.mainRepo.getAll(params);
    }
    async findAttribute(guaranteeAttributeId, params) {
        return await this.mainRepo.findById(guaranteeAttributeId, params);
    }
    async createAttribute(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const newAttribute = await this.mainRepo.updateOrCreate(data, trans);
            await trans.commit();
            return newAttribute;
        }, async () => await trans.rollback());
    }
    async updateAttribute(guaranteeAttributeId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async deleteAttribute(guaranteeAttributeId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async restoreAttribute(guaranteeAttributeId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
}
exports.default = AttributeService;
//# sourceMappingURL=AttributeService.js.map