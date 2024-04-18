"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const BaseConnection_1 = __importDefault(require("@app/db/BaseConnection"));
class Role extends sequelize_1.Model {
    static getSearchables() {
        return ["name"];
    }
    static getRelations() {
        return ["auths", "auths.user"];
    }
}
Role.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    modelName: "Role",
    tableName: "roles",
    sequelize: BaseConnection_1.default.getConnection(),
    createdAt: false,
    updatedAt: false,
});
exports.default = Role;
//# sourceMappingURL=Role.js.map