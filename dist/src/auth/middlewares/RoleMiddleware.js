"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = __importDefault(require("@/app/middlewares/Middleware"));
const response_1 = __importDefault(require("@/app/utils/response"));
class RoleMiddleware extends Middleware_1.default {
    hasPermission(permission) {
        return (req, res, next) => {
            const permissions = req.auth.permissions;
            try {
                if (permissions.some((perm) => perm.name == permission)) {
                    return next();
                }
                return response_1.default.error(res, 419, `No tienes permiso para ${permission}`);
            }
            catch (error) {
                response_1.default.error(res, 500, error.message);
                return;
            }
        };
    }
    hasAnyPermission(permissions) {
        return (req, res, next) => {
            const userPermissions = req.auth.permissions;
            try {
                const hasAny = permissions.some((perm) => {
                    return userPermissions.some((userPerm) => {
                        return userPerm.name == perm;
                    });
                });
                if (hasAny) {
                    return next();
                }
                return response_1.default.error(res, 419, `No tienes ninguno de estos permisos: ${permissions.join(", ")}`);
            }
            catch (error) {
                response_1.default.error(res, 500, error.message);
                return;
            }
        };
    }
    hasAllPermission(permissions) {
        return (req, res, next) => {
            const userPermissions = req.auth.permissions;
            try {
                const hasAll = permissions.every((perm) => {
                    return userPermissions.some((userPerm) => {
                        return userPerm.name == perm;
                    });
                });
                if (hasAll) {
                    return next();
                }
                return response_1.default.error(res, 419, `No tienes ninguno de estos permisos: ${permissions.join(", ")}`);
            }
            catch (error) {
                response_1.default.error(res, 500, error.message);
                return;
            }
        };
    }
}
exports.default = new RoleMiddleware();
//# sourceMappingURL=RoleMiddleware.js.map