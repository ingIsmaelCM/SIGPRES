"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const BaseConnection_1 = __importDefault(require("@app/db/BaseConnection"));
class Auth extends sequelize_1.Model {
    static getSearchables() {
        return ["email", "username", "name", "lastname", "lastLogin", "verifiedAt", "status"];
    }
    static getRelations() {
        return [
            "roles",
            "roles.auths",
            "roles.permissions",
            "permissions",
            "tenants",
        ];
    }
}
Auth.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        get() {
            return undefined;
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: sequelize_1.DataTypes.VIRTUAL,
        get() {
            return `${this.getDataValue("name")} ${this.getDataValue("lastname")}`;
        }
    },
    allPermissions: {
        type: sequelize_1.DataTypes.VIRTUAL,
        get() {
            if (!Boolean(this.permissions))
                return null;
            const rolePermissions = this.roles?.map((role) => role.permissions.map((perm) => ({ id: perm.id, name: perm.name })))[0] || [];
            const localPermissions = this.permissions
                .map((perm) => ({ id: perm.id, name: perm.name }));
            const allPermissions = rolePermissions.concat(localPermissions);
            const uniquePermissions = allPermissions.filter((item, index, self) => index === self.findIndex((t) => (t.id === item.id)));
            return Array.from(new Set(uniquePermissions));
        }
    },
    infoId: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    lastlogin: {
        type: sequelize_1.DataTypes.DATE,
    },
    sessionId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    verifiedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: BaseConnection_1.default.getConnection(),
    tableName: "auths",
    modelName: "Auth",
    paranoid: true,
});
exports.default = Auth;
//# sourceMappingURL=Auth.js.map