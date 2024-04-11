"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("@app/routes/BaseRoutes"));
const RoleController_1 = __importDefault(require("@auth/controllers/RoleController"));
const RoleRequests_1 = __importDefault(require("@auth/requests/RoleRequests"));
const RoleMiddleware_1 = __importDefault(require("../middlewares/RoleMiddleware"));
class RoleRoutes extends BaseRoutes_1.default {
    constructor() {
        super(new RoleController_1.default());
    }
    initRoutes() {
        this.router
            .route("/")
            .post(RoleMiddleware_1.default.hasPermission("Crear Rol"), RoleRequests_1.default.validateCreateRole(), RoleRequests_1.default.validate, (req, res) => this.controller.createRole(req, res));
        this.router.delete("/:id", RoleMiddleware_1.default.hasPermission("Eliminar Rol"), (req, res) => this.controller.deleteRole(req, res));
        this.router.post("/auth", RoleMiddleware_1.default.hasPermission("Asignar Rol a Usuario"), RoleRequests_1.default.validateAssignRole(), RoleRequests_1.default.validate, (req, res) => this.controller.assignRoleToAuth(req, res));
        this.router.post("/auth/permissions", RoleMiddleware_1.default.hasPermission("Asignar Permiso a Usuario"), RoleRequests_1.default.validateAssignPermissionToAuth(), RoleRequests_1.default.validate, (req, res) => this.controller.assignPermissionToAuth(req, res));
        this.router.post("/auth/permissions/grantall", RoleMiddleware_1.default.hasPermission("Asignar Permiso a Usuario"), RoleRequests_1.default.validateAssignPermissionToAuth().slice(0, 1), RoleRequests_1.default.validate, (req, res) => this.controller.grantAllToAuth(req, res));
        this.router.post("/permissions", RoleMiddleware_1.default.hasPermission("Asignar Permiso a Rol"), RoleRequests_1.default.validateAssignPermissionToRole(), RoleRequests_1.default.validate, (req, res) => this.controller.assignPermissionToRole(req, res));
        this.router.post("/permissions/grantall", RoleMiddleware_1.default.hasPermission("Asignar Permiso a Rol"), RoleRequests_1.default.validateAssignPermissionToRole().slice(0, 1), RoleRequests_1.default.validate, (req, res) => this.controller.grantAllToRole(req, res));
    }
}
exports.default = RoleRoutes;
//# sourceMappingURL=RoleRoutes.js.map