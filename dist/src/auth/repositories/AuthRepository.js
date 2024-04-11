"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const Auth_1 = __importDefault(require("@auth/models/Auth"));
const BaseRepository_1 = require("@app/repositories/BaseRepository");
class AuthRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Auth_1.default);
    }
    async assignRole(auth, role) {
        return this.safeRun(() => {
            return auth.addRoles(role);
        });
    }
    async assignPermission(auth, permissions, trans) {
        return this.safeRun(async () => {
            await auth.setPermissions([]);
            await auth.setPermissions(permissions);
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=AuthRepository.js.map