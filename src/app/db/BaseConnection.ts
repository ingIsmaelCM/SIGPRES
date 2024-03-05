import { Sequelize } from "sequelize";

import config from "../app.config";

/* Imports can't use path alias because migrations and seeds */

export default class BaseConnection<T> {
  private static connection: Sequelize | null;
  static request: any;

  constructor() {
    if (!BaseConnection.connection) {
      BaseConnection.connection = new Sequelize(
        config.db.database,
        config.db.user,
        config.db.password,
        {
          dialect: config.db.dialect,
          host: config.db.host,
          logging: config.db.logging,
          timezone: "-04:00",
          database: config.db.database,
        }
      );
    }
  }

  static getConnection(): Sequelize {
    try {
      new BaseConnection();
      return BaseConnection.connection!;
    } catch (error: any) {
      throw {
        code: 500,
        message: error.message,
      };
    }
  }

  static async getTrans() {
    try {
      return  await BaseConnection.getConnection().transaction({
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
