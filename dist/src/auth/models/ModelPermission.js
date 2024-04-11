"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConnection_1 = __importDefault(require("@app/db/BaseConnection"));
const sequelize_1 = require("sequelize");
const ModelPermission = BaseConnection_1.default.getConnection().define("ModelPermission", {
    modelType: sequelize_1.DataTypes.STRING,
    permissionId: sequelize_1.DataTypes.STRING,
    modelId: sequelize_1.DataTypes.STRING
}, {
    tableName: "model_permissions",
    freezeTableName: true,
    paranoid: false,
});
exports.default = ModelPermission;
//# sourceMappingURL=ModelPermission.js.map