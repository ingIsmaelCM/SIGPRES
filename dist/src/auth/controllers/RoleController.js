"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("@/app/controllers/Controller"));
const response_1 = __importDefault(require("@/app/utils/response"));
const RoleService_1 = __importDefault(require("../services/RoleService"));
class RoleController extends Controller_1.default {
    prefix = "roles";
    mainService = new RoleService_1.default();
    async createRole(req, res) {
        try {
            const role = req.body;
            await this.mainService.createRole(role);
            response_1.default.success(res, 201, "Rol creado correctamente");
        }
        catch (error) {
            response_1.default.error(res, error.code, error.message);
        }
    }
    async deleteRole(req, res) {
        try {
            const role = req.params.id;
            await this.mainService.deleteRole(role);
            response_1.default.success(res, 201, "Rol borrado correctamente");
        }
        catch (error) {
            response_1.default.error(res, error.code, error.message);
        }
    }
    async assignRoleToAuth(req, res) {
        return this.safeRun(async () => {
            const { authId, roleId } = req.body;
            return await this.mainService.assignRoleToAuth(authId, roleId);
        }, res, 201, "Role Asignado Correctamente");
    }
    async assignPermissionToAuth(req, res) {
        return this.safeRun(async () => {
            const { authId, permissionId } = req.body;
            await this.mainService.assignPermissionToAuth(authId, permissionId);
        }, res, 201, "Permisos asignados al usuario");
    }
    async grantAllToAuth(req, res) {
        return this.safeRun(async () => {
            const { authId } = req.body;
            return await this.mainService.grantAllToAuth(authId);
        }, res, 201, 'Todos los permisos asignados al usuario');
    }
    async assignPermissionToRole(req, res) {
        return this.safeRun(async () => {
            const { roleId, permissionId } = req.body;
            return await this.mainService.assignPermissionToRole(roleId, permissionId);
        }, res, 201, "Permisos asignados al rol");
    }
    async grantAllToRole(req, res) {
        return this.safeRun(async () => {
            const { roleId } = req.body;
            return await this.mainService.grantAllToRole(roleId);
        }, res, 201, "Todos los los permisos asignados al rol");
    }
}
exports.default = RoleController;
//# sourceMappingURL=RoleController.js.map