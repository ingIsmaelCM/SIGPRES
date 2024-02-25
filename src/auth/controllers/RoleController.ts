import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import response from "@/app/utils/response";
import { Request, Response, Router } from "express";
import RoleService from "../services/RoleService";
import RoleRoutes from "../routes/RoleRoutes";

export default class RoleController extends Controller implements IController {
  prefix: string = "roles";

  private roleService: RoleService = new RoleService();

  constructor() {
    super();
    new RoleRoutes(this.router, this).initRoutes();
  }
  async createRole(req: Request, res: Response) {
    try {
      const role = req.body;
      await this.roleService.createRole(role);
      response.success(res, 201, "Rol creado correctamente");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
  async deleteRole(req: Request, res: Response) {
    try {
      const role = req.params.id;
      await this.roleService.deleteRole(Number(role));
      response.success(res, 201, "Rol borrado correctamente");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
  async assignRoleToAuth(req: Request, res: Response) {
    try {
      const { authId, roleId } = req.body;
      await this.roleService.assingRoleToAuth(Number(authId), Number(roleId));
      response.success(res, 201, "Rol asignado correctamente");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }

  async assignPermissionToAuth(req: Request, res: Response) {
    try {
      const { authId, permissionId } = req.body;
      await this.roleService.assingPermissionToAuth(
        Number(authId),
        permissionId
      );
      response.success(res, 201, "Permiso asignado  al usuario");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
  async grantAllToAuth(req: Request, res: Response) {
    try {
      const { authId } = req.body;
      await this.roleService.grantAllToAuth(Number(authId));
      response.success(res, 201, "Todos los permisos asignados al usuario");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
  async assignPermissionToRole(req: Request, res: Response) {
    try {
      const { roleId, permissionId } = req.body;
      await this.roleService.assingPermissionToRole(
        Number(roleId),
        permissionId
      );
      response.success(res, 201, "Permiso asignado al rol");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
  async grantAllToRole(req: Request, res: Response) {
    try {
      const { roleId } = req.body;
      await this.roleService.grantAllToRole(Number(roleId));
      response.success(res, 201, "Todos los permisos asignados");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
}
