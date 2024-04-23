"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const JobRepository_1 = __importDefault(require("@source/repositories/JobRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const InfoService_1 = __importDefault(require("@source/services/InfoService"));
const JobViewRepository_1 = __importDefault(require("@source/repositories/JobViewRepository"));
class JobService extends Service_1.default {
    mainRepo = new JobRepository_1.default();
    jobViewRepo = new JobViewRepository_1.default();
    infoService = new InfoService_1.default();
    async getJobs(params) {
        return await this.jobViewRepo.getAll(params);
    }
    async findJob(jobId, params) {
        return await this.jobViewRepo.findById(jobId, params);
    }
    async createJob(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const newInfo = await this.infoService.setFromRelated(data, trans);
            const newJob = await this.mainRepo.create({ ...data, infoId: newInfo.id }, trans);
            const result = { ...newInfo.dataValues, ...newJob.dataValues };
            await trans.commit();
            return result;
        }, async () => await trans.rollback());
    }
    async updateJob(jobId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const updatedJob = await this.mainRepo.update(data, jobId, trans);
            if (data.infoId) {
                await this.infoService.updateFromRelated(data, data.infoId, trans);
            }
            await trans.commit();
            return updatedJob;
        }, async () => await trans.rollback());
    }
    async deleteJob(jobId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const deletedJob = await this.mainRepo.delete(jobId, trans);
            await trans.commit();
            return deletedJob;
        }, async () => await trans.rollback());
    }
    async restoreJob(jobId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const restoredJob = await this.mainRepo.restore(jobId, trans);
            await trans.commit();
            return restoredJob;
        }, async () => await trans.rollback());
    }
}
exports.default = JobService;
//# sourceMappingURL=JobService.js.map