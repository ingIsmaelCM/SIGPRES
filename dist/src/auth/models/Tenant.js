"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConnection_1 = __importDefault(require("@/app/db/BaseConnection"));
const sequelize_1 = require("sequelize");
class Tenant extends sequelize_1.Model {
    getRelations() {
        return ["auths", "auths.roles.permissions", "auths.permissions"];
    }
    getSearchables() {
        return ["name", "key"];
    }
}
Tenant.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATEONLY,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATEONLY,
    },
}, {
    modelName: "Tenant",
    tableName: "tenants",
    sequelize: BaseConnection_1.default.getConnection(),
    paranoid: true,
});
exports.default = Tenant;
//# sourceMappingURL=Tenant.js.map