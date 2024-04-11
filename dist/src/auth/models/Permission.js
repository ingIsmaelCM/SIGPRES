"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const BaseConnection_1 = __importDefault(require("@app/db/BaseConnection"));
class Permission extends sequelize_1.Model {
    getSearchables() {
        return ["name"];
    }
    getRelations() {
        return [];
    }
}
Permission.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    modelName: "Permission",
    tableName: "permissions",
    sequelize: BaseConnection_1.default.getConnection(),
    createdAt: false,
    updatedAt: false,
});
exports.default = Permission;
//# sourceMappingURL=Permission.js.map