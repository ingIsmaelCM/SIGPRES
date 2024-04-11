"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Preference_1 = __importDefault(require("@source/models/Preference"));
const BaseRepository_1 = require("@app/repositories/BaseRepository");
class PreferenceRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Preference_1.default);
    }
    async set(newPref, preferenceKey, trans) {
        return this.safeRun(async () => {
            const data = await this.get(preferenceKey, {});
            if (data) {
                return await this.update(newPref, preferenceKey, trans, "key");
            }
            else {
                throw {
                    code: 404,
                    message: `No se encontró la clave ${newPref.key}`,
                };
            }
        });
    }
    async get(key, params) {
        return this.safeRun(async () => {
            const pref = await this.find("key", key, false, params);
            if (!pref)
                return null;
            return {
                [key]: pref.value,
            };
        });
    }
}
exports.default = PreferenceRepository;
//# sourceMappingURL=PrefenceRepository.js.map