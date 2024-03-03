import { Sequelize } from "sequelize";
import config from "../app.config";
import * as models from "../../source/models";
import SourceRelation from "../../source/models/SourceRelation";
import { request } from "express";

export default class TenantConnection {
  private static readonly connections: Map<string, Sequelize> = new Map();

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
      });
      TenantConnection.connections.set(tenant, sequelize);
      TenantConnection.initModels(sequelize);
    }
    return TenantConnection.connections.get(tenant)!;
  }

  static initModels(instanceConection: Sequelize) {
    try {
      const modelos = Object.values(models).filter(
        (model: any) => !instanceConection.models[model]
      );
      for (let model of modelos) {
        (model as any).init(model.attributes, {
          sequelize: instanceConection,
          modelName: model.modelName,
          tableName: model.tableName,
          paranoid: true,
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
      const transaction = await TenantConnection.getConnection().transaction({
        autocommit: false,
      });
      return transaction;
    } catch (error: any) {
      throw {
        code: 500,
        message: error.message,
      };
    }
  }
}
