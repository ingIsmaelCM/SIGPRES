import {Sequelize} from "sequelize";
import config from "../app.config";
import * as models from "../../source/models";
import SourceRelation from "../../source/models/SourceRelation";
import {request} from "express";
import app from "../../../App";

export default class TenantConnection {
    private static readonly connections: Map<string, Sequelize> = new Map();

    private constructor() {
    }

    static getConnection(dbName?: string): Sequelize {
        const tenant = dbName || request.headers.tenant || config.db.database;
        if (!TenantConnection.connections.has(tenant)) {
            const sequelize = new Sequelize({
                dialect: config.db.dialect,
                host: config.db.host,
                port: config.db.port,
                username: config.db.user,
                password: config.db.password,
                database: tenant,
                logging: config.db.logging,
                timezone: "-04:00"
            });
            TenantConnection.connections.set(tenant, sequelize);
            TenantConnection.initModels(sequelize);
        }
        return TenantConnection.connections.get(tenant)!;
    }

    static initModels(instanceConnection: Sequelize) {
        try {
            const modelos = Object.values(models).filter(
                (model: any) => !instanceConnection.models[model]
            );
            for (let model of modelos) {
                (model as any).init(model.attributes, {
                    sequelize: instanceConnection,
                    modelName: model.modelName,
                    tableName: model.tableName,
                    paranoid: true,
                    ...model.additionalOptions

                });
            }
            SourceRelation.initRelation();
        } catch (error: any) {
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
        } catch (error: any) {
            throw {
                code: 500,
                message: error.message,
            };
        }
    }
}
