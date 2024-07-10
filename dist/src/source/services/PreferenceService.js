"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrefenceRepository_1 = __importDefault(require("@source/repositories/PrefenceRepository"));
const Service_1 = __importDefault(require("@app/services/Service"));
const TenantConnection_1 = __importDefault(require("@app/db/TenantConnection"));
class PreferenceService extends Service_1.default {
    preferenceRepo = new PrefenceRepository_1.default();
    async setPreference(preferenceKey, data) {
        const trans = await TenantConnection_1.default.getTrans();
        try {
            const pref = await this.preferenceRepo.set(data, preferenceKey, trans);
            await trans.commit();
            return pref;
        }
        catch (error) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async getPreference(key, params) {
        try {
            return await this.preferenceRepo.get(key, params);
        }
        catch (error) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async getPreferences(params) {
        try {
            return await this.preferenceRepo.getAll(params);
        }
        catch (error) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
}
exports.default = PreferenceService;
//# sourceMappingURL=PreferenceService.js.map