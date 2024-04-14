import {NextFunction, Response} from "express";
import response from "@app/utils/response";
import jwt from "jsonwebtoken";
import config from "@app/app.config";
import {AuthRepository} from "../repositories/AuthRepository";
import Middleware from "@app/middlewares/Middleware";
import Permission from "../models/Permission";
import Role from "../models/Role";
import TenantConnection from "@/app/db/TenantConnection";
import {IAuth, Itenant} from "@app/interfaces/AuthInterfaces";
import AuthService from "@auth/services/AuthService";

class AuthMiddleware extends Middleware {
    async auth(req: any, res: Response, next: NextFunction): Promise<any> {
        try {
            const authToken = await this.verifyTokenExists(req);
            const decoded = await this.verifyTokenIsValid(authToken);
            req.auth = await this.validateSessionId(decoded);
            TenantConnection.requestNamespace.run(async () => {
                try {
                    await new AuthService().refreshToken(req, res);
                } catch (error) {
                }
                TenantConnection.requestNamespace.set("req", req)
                TenantConnection.initModels(TenantConnection.getConnection());
                next();
            });
        } catch (error: any) {
            response.error(res, error.code, error.message, "No autorizado");
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
                req.headers["authorization"] || req.cookies.accessToken;
            if (!authToken) {
                reject({
                    code: 401,
                    message: "No se ha identificado el token de autenticación",
                });
            }
            resolve(authToken.split(" ")[1]);
        });
    }

    private verifyTokenIsValid(authToken: string) {
        return new Promise((resolve: any, reject: any) => {
            jwt.verify(
                authToken,
                config.auth.secret,
                (err: any, decoded: any) => {
                    if (err) {
                        reject({
                            code: 401,
                            message: "Token inválido",
                        })
                    }
                    resolve(decoded)
                }
            );
        })
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
    private async validateSessionId(decoded: any,) {
        try {
            const authRepository = new AuthRepository();
            const auth = await authRepository.find("id", decoded.id, false, {
                include: "roles.permissions,permissions,tenants",
            });
            this.checkSessionId(auth, decoded)
            let permissions: any[] = auth.permissions.map((p: Permission) => ({
                name: p.name,
                id: p.id,
            }));
            const rolePermissions: any[] = auth.roles.map((r: Role) =>
                r.permissions.map((p: Permission) => ({name: p.name, id: p.id}))
            );
            rolePermissions.forEach((rP) => {
                permissions = permissions.concat(rP);
            });
            const roles = auth.roles.map((r: Role) => ({name: r.name, id: r.id}));
            return {
                ...auth.dataValues,
                password: null,
                permissions: [...new Set(permissions)],
                roles,
                tenants: auth.tenants.map((tenant: Itenant) =>
                    ({name: tenant.name, id: tenant.id, key: tenant.key})),
                company: config.company,
            };
        } catch (error: any) {
            throw error;
        }
    }

    checkSessionId(auth: IAuth, decoded: Record<any, any>) {
        if (auth.sessionId !== decoded.sessionId) {
            throw {
                code: 401,
                message: "El token suministrado ya no es válido",
            };
        }
    }
}

export default new AuthMiddleware();
