import Middleware from "@/app/middlewares/Middleware";
import response from "@/app/utils/response";
import { NextFunction, Response } from "express";

type IPermission = {
  Id: string;
  name: string;
};
class RoleMiddleware extends Middleware {
  hasPermission(permission: string) {
    return (req: any, res: Response, next: NextFunction) => {
      const permissions: IPermission[] = req.auth.permissions;
      try {
        if (permissions.some((perm: IPermission) => perm.name == permission)) {
          return next();
        }
        return response.error(res, 419, `No tienes permiso para ${permission}`);
      } catch (error: any) {
        response.error(res, 500, error.message);
        return;
      }
    };
  }

  hasAnyPermission(permissions: string[]) {
    return (req: any, res: Response, next: NextFunction) => {
      const userPermissions: IPermission[] = req.auth.permissions;
      try {
        const hasAny = permissions.some((perm: string) => {
          return userPermissions.some((userPerm: IPermission) => {
            return userPerm.name == perm;
          });
        });
        if (hasAny) {
          return next();
        }
        return response.error(
          res,
          419,
          `No tienes ninguno de estos permisos: ${permissions.join(", ")}`
        );
      } catch (error: any) {
        response.error(res, 500, error.message);
        return;
      }
    };
  }

  hasAllPermission(permissions: string[]) {
    return (req: any, res: Response, next: NextFunction) => {
      const userPermissions: IPermission[] = req.auth.permissions;
      try {
        const hasAll = permissions.every((perm: string) => {
          return userPermissions.some((userPerm: IPermission) => {
            return userPerm.name == perm;
          });
        });
        if (hasAll) {
          return next();
        }
        return response.error(
            res,
            419,
            `No tienes ninguno de estos permisos: ${permissions.join(", ")}`
        );
      } catch (error: any) {
        response.error(res, 500, error.message);
        return;
      }
    };
  }
}

export default new RoleMiddleware();
