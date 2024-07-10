"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const app_config_1 = __importDefault(require("../app.config"));
class BaseConnection {
    static connection;
    static request;
    constructor() {
        if (!BaseConnection.connection) {
            BaseConnection.connection = new sequelize_1.Sequelize(app_config_1.default.db.database, app_config_1.default.db.user, app_config_1.default.db.password, {
                dialect: app_config_1.default.db.dialect,
                host: app_config_1.default.db.host,
                logging: app_config_1.default.db.logging,
                timezone: "-04:00",
                database: app_config_1.default.db.database,
            });
        }
    }
    static getConnection() {
        try {
            new BaseConnection();
            return BaseConnection.connection;
        }
        catch (error) {
            throw {
                code: 500,
                message: error.message,
            };
        }
    }
    static async getTrans() {
        try {
            return await BaseConnection.getConnection().transaction({
                autocommit: false,
            });
        }
        catch (error) {
            throw {
                code: 500,
                message: error.message,
            };
        }
    }
}
exports.default = BaseConnection;
//# sourceMappingURL=BaseConnection.js.map