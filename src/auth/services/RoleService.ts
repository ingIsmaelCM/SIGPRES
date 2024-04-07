import RoleRepository from "@auth/repositories/RoleRepository";
import {AuthRepository} from "@auth/repositories/AuthRepository";
import {IPermission, IRole} from "@app/interfaces/AuthInterfaces";
import BaseConnection from "@app/db/BaseConnection";
import PermissionRepository from "@auth/repositories/PermissionRepository";
import Service from "@app/services/Service";

export default class RoleService extends Service {
    private roleRepo: RoleRepository = new RoleRepository();
    private authRepo: AuthRepository = new AuthRepository();
    private permissionRepo: PermissionRepository = new PermissionRepository();

    async createRole(role: IRole) {
        const trans = await BaseConnection.getTrans();
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
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async deleteRole(roleId: string) {
        const trans = await BaseConnection.getTrans();
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
        } catch (error: any) {
            await trans.rollback();
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async assignRoleToAuth(authId: string, roleId: string) {
        try {
            const auth = await this.authRepo.findById(authId, {include: "roles"});
            const role = await this.roleRepo.findById(roleId);
            if (!auth || !role) {
                await Promise.reject({
                    code: 404,
                    message: "Usuario o rol no encontrado",
                });
            }
            await this.authRepo.assignRole(auth, role);
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async assignPermissionToAuth(authId: string, permissionId: string[]) {
        const trans = await BaseConnection.getTrans();
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
                return "Permisos asignados"
            },
            async () => await trans.rollback())
    }

    async grantAllToAuth(authId: string) {
        const trans = await BaseConnection.getTrans();
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
            const permissions: IPermission[] = (
                await this.permissionRepo.getAll({
                    fields: "id",
                })
            ).rows;

            const permissionsId = permissions.map(
                (permission: IPermission) => permission.id!
            );
            await this.authRepo.assignPermission(auth, permissionsId, trans);
        }, async () => await trans.rollback())
    }

    async assignPermissionToRole(roleId: string, permissionId: string[]) {
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
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    async grantAllToRole(roleId: string) {
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
            const permissions: IPermission[] = (
                await this.permissionRepo.getAll({
                    fields: "id",
                })
            ).rows;

            const permissionsId = permissions.map(
                (permission: IPermission) => permission.id!
            );
            await this.roleRepo.assignPermission(role, permissionsId);
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
}
