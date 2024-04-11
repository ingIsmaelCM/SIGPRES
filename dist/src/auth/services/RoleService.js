"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoleRepository_1 = __importDefault(require("@auth/repositories/RoleRepository"));
const AuthRepository_1 = require("@auth/repositories/AuthRepository");
const BaseConnection_1 = __importDefault(require("@app/db/BaseConnection"));
const PermissionRepository_1 = __importDefault(require("@auth/repositories/PermissionRepository"));
const Service_1 = __importDefault(require("@app/services/Service"));
class RoleService extends Service_1.default {
    roleRepo = new RoleRepository_1.default();
    authRepo = new AuthRepository_1.AuthRepository();
    permissionRepo = new PermissionRepository_1.default();
    async createRole(role) {
        const trans = await BaseConnection_1.default.getTrans();
        try {
            const existingRole = await this.roleRepo.find("name", role.name, true);
            if (existingRole) {
                await Promise.reject({
                    code: 422,
                    message: "Este rol ya existe",
                });
            }
            const newRole = await this.roleRepo.create(role, trans);
            await trans.commit();
            return newRole;
        }
        catch (error) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async deleteRole(roleId) {
        const trans = await BaseConnection_1.default.getTrans();
        try {
            const existingRole = await this.roleRepo.findById(roleId);
            if (!existingRole) {
                await Promise.reject({
                    code: 422,
                    message: "Este rol no existe",
                });
            }
            const newRole = await this.roleRepo.delete(roleId, trans);
            await trans.commit();
            return newRole;
        }
        catch (error) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async assignRoleToAuth(authId, roleId) {
        try {
            const auth = await this.authRepo.findById(authId, { include: "roles" });
            const role = await this.roleRepo.findById(roleId);
            if (!auth || !role) {
                await Promise.reject({
                    code: 404,
                    message: "Usuario o rol no encontrado",
                });
            }
            await this.authRepo.assignRole(auth, role);
        }
        catch (error) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async assignPermissionToAuth(authId, permissionId) {
        const trans = await BaseConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const auth = await this.authRepo.findById(authId, {
                include: "permissions",
            });
            if (!auth) {
                await Promise.reject({
                    code: 404,
                    message: "Usuario  no encontrado",
                });
            }
            await this.authRepo.assignPermission(auth, permissionId, trans);
            await trans.commit();
            return "Permisos asignados";
        }, async () => await trans.rollback());
    }
    async grantAllToAuth(authId) {
        const trans = await BaseConnection_1.default.getTrans();
        return this.safeRun(async () => {
            const auth = await this.authRepo.findById(authId, {
                include: "permissions",
            });
            if (!auth) {
                await Promise.reject({
                    code: 404,
                    message: "Usuario  no encontrado",
                });
            }
            const permissions = (await this.permissionRepo.getAll({
                fields: "id",
            })).rows;
            const permissionsId = permissions.map((permission) => permission.id);
            await this.authRepo.assignPermission(auth, permissionsId, trans);
        }, async () => await trans.rollback());
    }
    async assignPermissionToRole(roleId, permissionId) {
        try {
            const role = await this.roleRepo.findById(roleId, {
                include: "permissions",
            });
            if (!role) {
                await Promise.reject({
                    code: 404,
                    message: "Rol  no encontrado",
                });
            }
            await this.roleRepo.assignPermission(role, permissionId);
        }
        catch (error) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async grantAllToRole(roleId) {
        try {
            const role = await this.roleRepo.findById(roleId, {
                include: "permissions",
            });
            if (!role) {
                await Promise.reject({
                    code: 404,
                    message: "Rol  no encontrado",
                });
            }
            const permissions = (await this.permissionRepo.getAll({
                fields: "id",
            })).rows;
            const permissionsId = permissions.map((permission) => permission.id);
            await this.roleRepo.assignPermission(role, permissionsId);
        }
        catch (error) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
}
exports.default = RoleService;
//# sourceMappingURL=RoleService.js.map