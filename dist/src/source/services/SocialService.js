"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("@app/services/Service"));
const SocialRepository_1 = __importDefault(require("@source/repositories/SocialRepository"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
const models_1 = require("@source/models");
class SocialService extends Service_1.default {
    mainRepo = new SocialRepository_1.default();
    async getSocials(params) {
        return await this.mainRepo.getAll(params);
    }
    async findSocial(socialId, params) {
        return await this.mainRepo.findById(socialId, params);
    }
    async createSocial(data) {
        const trans = await TenantConnection_1.default.getTrans();
        return this.safeRun(async () => {
            await this.mainRepo.validateBeforeInsertRelation(models_1.Client, data.clientId);
            const newSocial = await this.mainRepo.updateOrCreate(data, trans);
            await trans.commit();
            return newSocial;
        }, async () => await trans.rollback());
    }
}
exports.default = SocialService;
//# sourceMappingURL=SocialService.js.map