"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const InfoRepository_1 = __importDefault(require("@source/repositories/InfoRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class InfoService extends Service_1.default {
    mainRepo = new InfoRepository_1.default();
    async getInfos(params) {
        return await this.mainRepo.getAll(params);
    }
    async findInfo(infoId, params) {
        return await this.mainRepo.findById(infoId, params);
    }
    async createInfo(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const newInfo = await this.mainRepo.create(data, trans);
            await trans.commit();
            return newInfo;
        }, async () => await trans.rollback());
    }
    async setFromRelated(data, trans, type = 'General') {
        return this.safeRun(async () => {
            data.type = type;
            return await this.mainRepo.updateOrCreate(data, trans);
        });
    }
    async updateFromRelated(data, infoId, trans, type = "General") {
        return this.safeRun(async () => {
            data.type = type;
            return await this.mainRepo.update(data, infoId, trans);
        });
    }
    async updateInfo(infoId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const updatedInfo = await this.mainRepo.update(data, infoId, trans);
            await trans.commit();
            return updatedInfo;
        }, async () => await trans.rollback());
    }
    async deleteInfo(infoId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async restoreInfo(infoId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
}
exports.default = InfoService;
//# sourceMappingURL=InfoService.js.map