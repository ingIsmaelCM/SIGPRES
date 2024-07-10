import Controller from "@/app/controllers/Controller";
import IController from "@/app/controllers/IController";
import response from "@/app/utils/response";
import {Request, Response} from "express";
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
        return this.safeRun(async () => {
            const {authId, roleId} = req.body;
            return await this.mainService.assignRoleToAuth(authId, roleId);
        }, res, 201, "Role Asignado Correctamente")
    }

    async assignPermissionToAuth(req: Request, res: Response) {
        return this.safeRun(async () => {
            const {authId, permissionId} = req.body;
            await this.mainService.assignPermissionToAuth(
                authId,
                permissionId
            );
        }, res, 201, "Permisos asignados al usuario")
    }

    async grantAllToAuth(req: Request, res: Response) {
        return this.safeRun(async () => {
            const {authId} = req.body;
            return await this.mainService.grantAllToAuth(authId);
        }, res, 201, 'Todos los permisos asignados al usuario')
    }

    async assignPermissionToRole(req: Request, res: Response) {
        return this.safeRun(async () => {
            const {roleId, permissionId} = req.body;
            return await this.mainService.assignPermissionToRole(
                roleId,
                permissionId
            );
        }, res, 201, "Permisos asignados al rol")
    }

    async grantAllToRole(req: Request, res: Response) {
      return this.safeRun(async()=>{
          const {roleId} = req.body;
        return  await this.mainService.grantAllToRole(roleId);
      },res, 201, "Todos los los permisos asignados al rol")
    }
}
