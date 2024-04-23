"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("@app/utils/response"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = __importDefault(require("@app/app.config"));
const AuthRepository_1 = require("../repositories/AuthRepository");
const Middleware_1 = __importDefault(require("@app/middlewares/Middleware"));
const TenantConnection_1 = __importDefault(require("@/app/db/TenantConnection"));
const AuthService_1 = __importDefault(require("@auth/services/AuthService"));
const tools_1 = __importDefault(require("@app/utils/tools"));
class AuthMiddleware extends Middleware_1.default {
    async auth(req, res, next) {
        try {
            const authToken = await this.verifyTokenExists(req);
            const decoded = await this.verifyTokenIsValid(authToken);
            req.auth = await this.validateSessionId(decoded);
            TenantConnection_1.default.requestNamespace.run(async () => {
                try {
                    await new AuthService_1.default().refreshToken(req, res);
                    const tenant = req.cookies.tenant;
                    tools_1.default.setCookie(res, "tenant", tenant);
                }
                catch (error) {
                }
                TenantConnection_1.default.requestNamespace.set("req", req);
                next();
            });
        }
        catch (error) {
            response_1.default.error(res, error.code, error.message, "No autorizado");
            return;
        }
    }
    async emailExists(req, res, next) {
        try {
            const auth = await new AuthRepository_1.AuthRepository().find("email", req.body.email);
            if (auth) {
                next();
                return;
            }
            else {
                response_1.default.error(res, 404, "Este correo no tiene ninguna cuenta asociada");
                return;
            }
        }
        catch (error) {
            response_1.default.error(res, 500, error.message);
            return;
        }
    }
    async verifyTokenExists(req) {
        return new Promise((resolve, reject) => {
            const authToken = req.headers["authorization"] || req.cookies.accessToken;
            if (!authToken) {
                reject({
                    code: 401,
                    message: "No se ha identificado el token de autenticación",
                });
            }
            resolve(authToken.split(" ")[1]);
        });
    }
    verifyTokenIsValid(authToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(authToken, app_config_1.default.auth.secret, (err, decoded) => {
                if (err) {
                    reject({
                        code: 401,
                        message: "Token inválido",
                    });
                }
                resolve(decoded);
            });
        });
    }
    isUniqueEmail() {
        return async (req, res, next) => {
            try {
                const repo = new AuthRepository_1.AuthRepository();
                const exists = await repo.find("email", req.body.email);
                if (exists) {
                    response_1.default.error(res, 422, "Este correo ya está registrado");
                    return;
                }
                next();
            }
            catch (error) {
                response_1.default.error(res, 500, error.message);
                return;
            }
        };
    }
    async validateSessionId(decoded) {
        try {
            const authRepository = new AuthRepository_1.AuthRepository();
            const auth = await authRepository.find("id", decoded.id, false, {
                include: "roles.permissions,permissions,tenants",
            });
            this.checkSessionId(auth, decoded);
            let permissions = auth.permissions.map((p) => ({
                name: p.name,
                id: p.id,
            }));
            const rolePermissions = auth.roles.map((r) => r.permissions.map((p) => ({ name: p.name, id: p.id })));
            rolePermissions.forEach((rP) => {
                permissions = permissions.concat(rP);
            });
            const roles = auth.roles.map((r) => ({ name: r.name, id: r.id }));
            return {
                ...auth.dataValues,
                password: null,
                permissions: [...new Set(permissions)],
                roles,
                tenants: auth.tenants.map((tenant) => ({ name: tenant.name, id: tenant.id, key: tenant.key })),
                company: app_config_1.default.company,
            };
        }
        catch (error) {
            throw error;
        }
    }
    checkSessionId(auth, decoded) {
        if (auth.sessionId !== decoded.sessionId) {
            throw {
                code: 401,
                message: "El token suministrado ya no es válido",
            };
        }
    }
}
exports.default = new AuthMiddleware();
//# sourceMappingURL=AuthMiddleware.js.map