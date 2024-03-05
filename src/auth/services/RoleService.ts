import RoleRepository from "@auth/repositories/RoleRepository";
import { AuthRepository } from "@auth/repositories/AuthRepository";
import { IPermission, IRole } from "@/auth/utils/AuthInterfaces";
import BaseConnection from "@app/db/BaseConnection";
import PermissionRepository from "@auth/repositories/PermissionRepository";
export default class RoleService {
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
  async deleteRole(roleId: number) {
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
  async assingRoleToAuth(authId: number, roleId: number) {
    try {
      const auth = await this.authRepo.findById(authId, { include: "roles" });
      const role = await this.roleRepo.findById(roleId);
      if (!auth || !role) {
        await Promise.reject({
          code: 404,
          message: "Usuario o rol no encontrado",
        });
      }
      await this.authRepo.assingRole(auth, role);
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  async assingPermissionToAuth(authId: number, permissionId: number[]) {
    try {
      const auth = await this.authRepo.findById(authId, {
        include: "permissions",
      });
      if (!auth) {
        await Promise.reject({
          code: 404,
          message: "Usuario  no encontrado",
        });
      }
      await this.authRepo.assingPermission(auth, permissionId);
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
  async grantAllToAuth(authId: number) {
    try {
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
      await this.authRepo.assingPermission(auth, permissionsId);
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
  async assingPermissionToRole(roleId: number, permissionId: number[]) {
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
      await this.roleRepo.assingPermission(role, permissionId);
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  async grantAllToRole(roleId: number) {
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
      await this.roleRepo.assingPermission(role, permissionsId);
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }
}
