import Auth from "@auth/models/Auth";
import Role from "@auth/models/Role";
import Permission from "@auth/models/Permission";
import ModelPermission from "@auth/models/ModelPermission";
import Tenant from "./Tenant";
import {UserView} from "@source/models";

export default class AuthRelation {
  static initRelations() {
    Auth.belongsToMany(Role, {
      foreignKey: "roleId",
      through: "auth_roles",
      as: "roles",
    });

    Auth.belongsToMany(Permission, {
      as: "permissions",
      foreignKey: "modelId",
      through: {
        model: ModelPermission,
        scope: {
          modelType: "auth",
        },
      },
      constraints: false,
    });



    Auth.belongsToMany(Tenant, {
      through: "auth_tenants",
      foreignKey: "authId",
      as: "tenants",
    });

    Role.belongsToMany(Auth, {
      as: "auths",
      foreignKey: "authId",
      through: "auth_roles",
    });

    Role.belongsToMany(Permission, {
      as: "permissions",
      foreignKey: "modelId",
      through: {
        model: ModelPermission,
        scope: {
          modelType: "role",
        },
      },
      constraints: false,
    });
    Permission.belongsToMany(Role, {
      as: "roles",
      foreignKey: "permissionId",
      through: {
        model: ModelPermission,
        scope: {
          modelType: "role",
        },
      },
      constraints: false,
    });
    Permission.belongsToMany(Auth, {
      as: "auths",
      foreignKey: "permissionId",
      through: {
        model: ModelPermission,
        scope: {
          modelType: "auth",
        },
      },
      constraints: false,
    });

    Tenant.belongsToMany(Auth, {
      through: "auth_tenants",
      as: "auths",
      foreignKey: "tenantId",
    });
  }
}
