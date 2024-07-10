"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppRoutes_1 = __importDefault(require("@app/routes/AppRoutes"));
const RoleRoutes_1 = __importDefault(require("@auth/routes/RoleRoutes"));
const TenantRoutes_1 = __importDefault(require("@auth/routes/TenantRoutes"));
const UserRoute_1 = __importDefault(require("@source/routes/UserRoute"));
const authRoutes = [
    new AppRoutes_1.default(),
    new RoleRoutes_1.default(),
    new TenantRoutes_1.default(),
    new UserRoute_1.default(),
];
exports.default = authRoutes;
//# sourceMappingURL=index.js.map