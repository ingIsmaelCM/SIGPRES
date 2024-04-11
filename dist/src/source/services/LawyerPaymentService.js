"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const LawyerPaymentRepository_1 = __importDefault(require("@source/repositories/LawyerPaymentRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class LawyerPaymentService extends Service_1.default {
    mainRepo = new LawyerPaymentRepository_1.default();
    async getLawyerPayments(params) {
        return await this.mainRepo.getAll(params);
    }
    async findLawyerPayment(lawyerPaymentId, params) {
        return await this.mainRepo.findById(lawyerPaymentId, params);
    }
    async createLawyerPayment(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async updateLawyerPayment(lawyerPaymentId, data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async deleteLawyerPayment(lawyerPaymentId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
    async restoreLawyerPayment(lawyerPaymentId) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
        }, async () => await trans.rollback());
    }
}
exports.default = LawyerPaymentService;
//# sourceMappingURL=LawyerPaymentService.js.map