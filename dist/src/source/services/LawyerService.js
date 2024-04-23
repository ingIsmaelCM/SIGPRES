"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const LawyerRepository_1 = __importDefault(require("@source/repositories/LawyerRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const LawyerViewRepository_1 = __importDefault(require("@source/repositories/LawyerViewRepository"));
const InfoService_1 = __importDefault(require("@source/services/InfoService"));
class LawyerService extends Service_1.default {
    mainRepo = new LawyerRepository_1.default();
    infoService = new InfoService_1.default();
    lawyerViewRepo = new LawyerViewRepository_1.default();
    async getLawyers(params) {
        return await this.lawyerViewRepo.getAll(params);
    }
    async findLawyer(lawyerId, params) {
        return await this.lawyerViewRepo.findById(lawyerId, params);
    }
    async createLawyer(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const newInfo = await this.infoService.setFromRelated(data, trans, 'Lawyer');
            const newLawyer = await this.mainRepo.create({ ...data, infoId: newInfo.id }, trans);
            await trans.commit();
            return { ...newInfo.dataValues, ...newLawyer.dataValues };
        }, async () => await trans.rollback());
    }
    async updateLawyer(lawyerId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const updatedLawyer = await this.mainRepo.update(data, lawyerId, trans);
            if (data.infoId) {
                await this.infoService.updateFromRelated(data, data.infoId, trans, 'Lawyer');
            }
            await trans.commit();
            return updatedLawyer;
        }, async () => await trans.rollback());
    }
    async deleteLawyer(lawyerId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const deletedLawyer = await this.mainRepo.delete(lawyerId, trans);
            await trans.commit();
            return deletedLawyer;
        }, async () => await trans.rollback());
    }
    async restoreLawyer(lawyerId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const restoredLawyer = await this.mainRepo.restore(lawyerId, trans);
            await trans.commit();
            return restoredLawyer;
        }, async () => await trans.rollback());
    }
}
exports.default = LawyerService;
//# sourceMappingURL=LawyerService.js.map