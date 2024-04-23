import {Sequelize} from "sequelize";
import config from "../app.config";
import * as models from "../../source/models";
import SourceRelation from "../../source/models/SourceRelation";
import {request} from "express";
import app from "../../../App";
import {createNamespace} from "cls-hooked"
import MigrateTenant from "@app/db/migrations/tenants/MigrateTenant";
import path from "path";
import MigrateView from "@app/db/migrations/tenants/MigrateView";

export default class TenantConnection {
    private static readonly connections: Map<string, Sequelize> = new Map();

    static readonly requestNamespace = createNamespace("request");

    private constructor() {
    }

    static getConnection(dbName?: string): Sequelize {
        const storedReq = TenantConnection.requestNamespace.get('req')
        const tenant = dbName || storedReq?.cookies.tenant;
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
            for (let model of Object.values(models)) {
                instanceConnection.define(model.modelName, <any>model.attributes, {
                    modelName: model.modelName,
                    tableName: model.tableName,
                    paranoid: true,
                    timestamps: true,
                    ...(model.additionalOptions || {})
                });

            }
            const filePath = path.join(__dirname, 'migrations', 'tenants', 'tableView.sql');
            MigrateView.runSQLFile(filePath, instanceConnection)
                .then(() => console.log("Query ejecutado"))
                .catch((err: any) => console.log(err));
            SourceRelation.initRelation(instanceConnection);
        } catch (error: any) {
            console.log(error)
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
