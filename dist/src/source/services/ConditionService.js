"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const ConditionRepository_1 = __importDefault(require("@source/repositories/ConditionRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class ConditionService extends Service_1.default {
    mainRepo = new ConditionRepository_1.default();
    async getConditions(params) {
        return await this.mainRepo.getAll(params);
    }
    async findCondition(conditionId, params) {
        return await this.mainRepo.findById(conditionId, params);
    }
    async createCondition(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async updateCondition(conditionId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async deleteCondition(conditionId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async restoreCondition(conditionId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
}
exports.default = ConditionService;
//# sourceMappingURL=ConditionService.js.map