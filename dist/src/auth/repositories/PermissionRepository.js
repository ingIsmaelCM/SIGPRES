"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@app/repositories/BaseRepository");
const Permission_1 = __importDefault(require("../models/Permission"));
class PermissionRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Permission_1.default);
    }
}
exports.default = PermissionRepository;
//# sourceMappingURL=PermissionRepository.js.map