"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const AmortizationRepository_1 = __importDefault(require("@source/repositories/AmortizationRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const AmortizationViewRepository_1 = __importDefault(require("@source/repositories/AmortizationViewRepository"));
class AmortizationService extends Service_1.default {
    mainRepo = new AmortizationRepository_1.default();
    amortizationViewRepo = new AmortizationViewRepository_1.default();
    async getAmortizations(params) {
        return await this.amortizationViewRepo.getAll(params);
    }
    async findAmortization(amortizationId, params) {
        return await this.amortizationViewRepo.findById(amortizationId, params);
    }
    async createAmortization(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async updateAmortization(amortizationId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async deleteAmortization(amortizationId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async restoreAmortization(amortizationId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
}
exports.default = AmortizationService;
//# sourceMappingURL=AmortizationService.js.map