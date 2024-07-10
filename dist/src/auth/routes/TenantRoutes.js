"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const TenantController_1 = __importDefault(require("../controllers/TenantController"));
const RoleMiddleware_1 = __importDefault(require("../middlewares/RoleMiddleware"));
const PermissionEnums_1 = __importDefault(require("@app/interfaces/PermissionEnums"));
const TenantRequest_1 = __importDefault(require("../requests/TenantRequest"));
class TenantRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new TenantController_1.default());
    }
    initRoutes() {
        this.controller.router
            .route("/")
            .get(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.getTenants), (req, res) => this.controller.getTenants(req, res))
            .post(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createTenant), TenantRequest_1.default.createTenantRequest(), TenantRequest_1.default.validate, (req, res) => this.controller.createTenant(req, res));
        this.controller.router.post('/:id/assign', RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.createTenant), TenantRequest_1.default.assignTenantRequest(), TenantRequest_1.default.requireIdRequest(), TenantRequest_1.default.validate, (req, res) => this.controller.assignToUser(req, res));
        this.controller.router.post('/switch', TenantRequest_1.default.switchTenantRequest(), TenantRequest_1.default.validate, (req, res) => this.controller.switchTenant(req, res));
        this.controller.router
            .route("/:id")
            .put(RoleMiddleware_1.default.hasPermission(PermissionEnums_1.default.editTenant), TenantRequest_1.default.updateTenantRequest(), TenantRequest_1.default.requireIdRequest(), TenantRequest_1.default.validate, (req, res) => this.controller.updateTenant(req, res));
    }
}
exports.default = TenantRoutes;
//# sourceMappingURL=TenantRoutes.js.map