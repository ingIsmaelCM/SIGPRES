import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import response from "@/app/utils/response";
import { Request, Response} from "express";
import RoleService from "../services/RoleService";

export default class RoleController extends Controller implements IController {
  prefix: string = "roles";
   mainService: RoleService = new RoleService();


  async createRole(req: Request, res: Response) {
    try {
      const role = req.body;
      await this.mainService.createRole(role);
      response.success(res, 201, "Rol creado correctamente");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
  async deleteRole(req: Request, res: Response) {
    try {
      const role = req.params.id;
      await this.mainService.deleteRole(role);
      response.success(res, 201, "Rol borrado correctamente");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
  async assignRoleToAuth(req: Request, res: Response) {
    try {
      const { authId, roleId } = req.body;
      await this.mainService.assingRoleToAuth(authId, roleId);
      response.success(res, 201, "Rol asignado correctamente");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }

  async assignPermissionToAuth(req: Request, res: Response) {
    try {
      const { authId, permissionId } = req.body;
      await this.mainService.assingPermissionToAuth(
        authId,
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
      await this.mainService.grantAllToAuth(authId);
      response.success(res, 201, "Todos los permisos asignados al usuario");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
  async assignPermissionToRole(req: Request, res: Response) {
    try {
      const { roleId, permissionId } = req.body;
      await this.mainService.assingPermissionToRole(
        roleId,
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
      await this.mainService.grantAllToRole(roleId);
      response.success(res, 201, "Todos los permisos asignados");
    } catch (error: any) {
      response.error(res, error.code, error.message);
    }
  }
}
