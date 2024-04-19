"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const AppController_1 = __importDefault(require("@app/controllers/AppController"));
const AuthMiddleware_1 = __importDefault(require("@auth/middlewares/AuthMiddleware"));
const RoleMiddleware_1 = __importDefault(require("@/auth/middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("../interfaces/PermissionEnums"));
class AppRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new AppController_1.default());
    }
    initRoutes() {
        this.controller.router.post("/cloudinary/signature", AuthMiddleware_1.default.auth, RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getCloudinarySigns), (req, res) => this.controller.getCloudSignature(req, res));
        this.controller.router.get('/test', (req, res) => this.controller.testRoute(req, res));
    }
}
exports.default = AppRoutes;
//# sourceMappingURL=AppRoutes.js.map