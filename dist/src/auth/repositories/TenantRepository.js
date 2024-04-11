"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@/app/repositories/BaseRepository");
const Tenant_1 = __importDefault(require("../models/Tenant"));
class TenantRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Tenant_1.default);
    }
}
exports.default = TenantRepository;
//# sourceMappingURL=TenantRepository.js.map