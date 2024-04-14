"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const app_config_1 = __importDefault(require("../app.config"));
const models = __importStar(require("../../source/models"));
const SourceRelation_1 = __importDefault(require("../../source/models/SourceRelation"));
const cls_hooked_1 = require("cls-hooked");
class TenantConnection {
    static connections = new Map();
    static requestNamespace = (0, cls_hooked_1.createNamespace)("request");
    constructor() {
    }
    static getConnection(dbName) {
        const storedReq = dbName || TenantConnection.requestNamespace.get('req');
        const tenant = storedReq.cookies.tenant;
        if (!TenantConnection.connections.has(tenant)) {
            const sequelize = new sequelize_1.Sequelize({
                dialect: app_config_1.default.db.dialect,
                host: app_config_1.default.db.host,
                port: app_config_1.default.db.port,
                username: app_config_1.default.db.user,
                password: app_config_1.default.db.password,
                database: tenant,
                logging: app_config_1.default.db.logging,
                timezone: "-04:00"
            });
            TenantConnection.connections.set(tenant, sequelize);
        }
        return TenantConnection.connections.get(tenant);
    }
    static initModels(instanceConnection) {
        try {
            const modelos = Object.values(models).filter((model) => !instanceConnection.models[model]);
            for (let model of modelos) {
                model.init(model.attributes, {
                    sequelize: instanceConnection,
                    modelName: model.modelName,
                    tableName: model.tableName,
                    paranoid: true,
                    ...model.additionalOptions
                });
            }
            SourceRelation_1.default.initRelation();
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
            return await TenantConnection.getConnection().transaction({
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
exports.default = TenantConnection;
//# sourceMappingURL=TenantConnection.js.map