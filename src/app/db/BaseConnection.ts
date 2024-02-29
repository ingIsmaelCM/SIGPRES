import { Sequelize } from "sequelize";
import * as models from "../../source/models";
import config from "../app.config";
import SourceRelation from "../../source/models/SourceRelation";

/* Imports can't use path alias because migrations and seeds */

export default class BaseConnection<T> {
  private static connections: Map<string, Sequelize> = new Map();
  static request: any;

  constructor(database: string) {
    if (!BaseConnection.connections.has(database)) {
      const connection = new Sequelize(
        database,
        config.db.user,
        config.db.password,
        {
          dialect: config.db.dialect,
          host: config.db.host,
          logging: config.db.logging,
          timezone: "-04:00",
        }
      );
      if (database != config.db.database) {
        BaseConnection.initModels(connection);
      }
      BaseConnection.connections.set(database, connection);
    }
  }

  static getConnection(dbName?: string): Sequelize {
    try {
      if (dbName) {
        new BaseConnection(dbName);
      } else {
        new BaseConnection(config.db.database);
      }
      return BaseConnection.connections.get(dbName || config.db.database)!;
    } catch (error: any) {
      throw {
        code: 500,
        message: error.message,
      };
    }
  }

  static async getTrans(dbDefault: boolean = false) {
    try {
      const tenant = dbDefault
        ? null
        : BaseConnection.request?.cookies?.tenant || undefined;
      const transaction = await BaseConnection.getConnection(
        tenant
      ).transaction({
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

  static initModels(instanceConection: Sequelize) {
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
    instanceConection.models;
    SourceRelation.initRelation();
  }
}
