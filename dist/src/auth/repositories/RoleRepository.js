"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = __importDefault(require("../models/Role"));
const BaseRepository_1 = require("@app/repositories/BaseRepository");
class RoleRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Role_1.default);
    }
    async assignPermission(role, permission) {
        return this.safeRun(() => {
            return role.addPermissions(permission);
        });
    }
}
exports.default = RoleRepository;
//# sourceMappingURL=RoleRepository.js.map