import { NextFunction, Request, Response } from "express";
import response from "@app/utils/response";
import jwt from "jsonwebtoken";
import config from "@app/app.config";
import { AuthRepository } from "../repositories/AuthRepository";
import Middleware from "@app/middlewares/Middleware";
import Permission from "../models/Permission";
import Role from "../models/Role";
import BaseConnection from "@/app/db/BaseConnection";

class AuthMiddleware extends Middleware {
  static request: any;

  /**
   * Authenticates the user using the JWT token in the request headers or cookies.
   * If the token is valid, the user's session is validated and the user object is attached to the request object as `req.auth`.
   * @param req The Express request object.
   * @param res The Express response object.
   * @param next The Express next function.
   */
  async auth(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const authToken = await this.verifyTokenExists(req);
      const decoded = this.verifyTokenIsValid(authToken, req);
      const auth = await this.validateSessionId(decoded, res);
      req.auth = auth;
      BaseConnection.request = req;

      next();
    } catch (error: any) {
      response.error(res, error.code, error.message);
      return;
    }
  }
  async emailExists(req: any, res: Response, next: NextFunction) {
    try {
      const auth: any = await new AuthRepository().find(
        "email",
        req.body.email
      );
      if (auth) {
        next();
        return;
      } else {
        response.error(
          res,
          404,
          "Este correo no tiene ninguna cuenta asociada"
        );
        return;
      }
    } catch (error: any) {
      response.error(res, 500, error.message);
      return;
    }
  }

  private async verifyTokenExists(req: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const authToken: any =
        req.headers.authorization || req.cookies.accessToken;
      if (!authToken) {
        reject({
          code: 401,
          message: "No se ha identificado el token de autenticación",
        });
      }
      resolve(authToken.split(" ")[1]);
    });
  }

  private verifyTokenIsValid(authToken: string, req: any) {
    return jwt.verify(
      authToken,
      config.auth.secret,
      (err: any, decoded: any) => {
        if (err) {
          throw {
            code: 401,
            message: err.message,
          };
        }
        return decoded;
      }
    );
  }

  isUniqueEmail() {
    return async (req: any, res: any, next: NextFunction) => {
      try {
        const repo = new AuthRepository();
        const exists = await repo.find("email", req.body.email);
        if (exists) {
          response.error(res, 422, "Este correo ya está registrado");
          return;
        }
        next();
      } catch (error: any) {
        response.error(res, 500, error.message);
        return;
      }
    };
  }

  /* Check if token has not been invalidated */
  private async validateSessionId(decoded: any, res: Response) {
    try {
      const authRepository = new AuthRepository();
      const auth = await authRepository.find("id", decoded.id, false, {
        include: "roles.permissions,permissions",
      });
      if (auth.sessionId !== decoded.sessionId) {
        throw {
          code: 401,
          message: "El token suministrado ya no es válido",
        };
      }
      let permissions: any[] = auth.permissions.map((p: Permission) => ({
        name: p.name,
        id: p.id,
      }));
      const rolePermissions: any[] = auth.roles.map((r: Role) =>
        r.permissions.map((p: Permission) => ({ name: p.name, id: p.id }))
      );
      rolePermissions.forEach((rP) => {
        permissions = permissions.concat(rP);
      });
      const roles = auth.roles.map((r: Role) => ({ name: r.name, id: r.id }));
      const userAuth = {
        ...auth.dataValues,
        password: null,
        permissions: [...new Set(permissions)],
        roles,
        company: config.company,
      };
      return userAuth;
    } catch (error: any) {
      throw error;
    }
  }
}

export default new AuthMiddleware();
