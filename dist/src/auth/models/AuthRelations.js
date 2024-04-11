"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("@auth/models/Auth"));
const Role_1 = __importDefault(require("@auth/models/Role"));
const Permission_1 = __importDefault(require("@auth/models/Permission"));
const ModelPermission_1 = __importDefault(require("@auth/models/ModelPermission"));
const Tenant_1 = __importDefault(require("./Tenant"));
class AuthRelation {
    static initRelations() {
        Auth_1.default.belongsToMany(Role_1.default, {
            foreignKey: "roleId",
            through: "auth_roles",
            as: "roles",
        });
        Auth_1.default.belongsToMany(Permission_1.default, {
            as: "permissions",
            foreignKey: "modelId",
            through: {
                model: ModelPermission_1.default,
                scope: {
                    modelType: "auth",
                },
            },
            constraints: false,
        });
        Auth_1.default.belongsToMany(Tenant_1.default, {
            through: "auth_tenants",
            foreignKey: "authId",
            as: "tenants",
        });
        Role_1.default.belongsToMany(Auth_1.default, {
            as: "auths",
            foreignKey: "authId",
            through: "auth_roles",
        });
        Role_1.default.belongsToMany(Permission_1.default, {
            as: "permissions",
            foreignKey: "modelId",
            through: {
                model: ModelPermission_1.default,
                scope: {
                    modelType: "role",
                },
            },
            constraints: false,
        });
        Permission_1.default.belongsToMany(Role_1.default, {
            as: "roles",
            foreignKey: "permissionId",
            through: {
                model: ModelPermission_1.default,
                scope: {
                    modelType: "role",
                },
            },
            constraints: false,
        });
        Permission_1.default.belongsToMany(Auth_1.default, {
            as: "auths",
            foreignKey: "permissionId",
            through: {
                model: ModelPermission_1.default,
                scope: {
                    modelType: "auth",
                },
            },
            constraints: false,
        });
        Tenant_1.default.belongsToMany(Auth_1.default, {
            through: "auth_tenants",
            as: "auths",
            foreignKey: "tenantId",
        });
    }
}
exports.default = AuthRelation;
//# sourceMappingURL=AuthRelations.js.map