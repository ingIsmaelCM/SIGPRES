"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TenantConnection_1 = __importDefault(require("../db/TenantConnection"));
class Service {
    async safeRun(method, cbError) {
        try {
            TenantConnection_1.default.getConnection();
            return await method();
        }
        catch (error) {
            cbError && (await cbError());
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
}
exports.default = Service;
//# sourceMappingURL=Service.js.map