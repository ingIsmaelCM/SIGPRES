import { Sequelize } from "sequelize";
import config from "../app.config";

export default class BaseConnection<T> {
  protected static connection: Sequelize | null;
  static request: any;
  constructor(database: string) {
    BaseConnection.connection = new Sequelize(
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
  }
  static getConnection(dbName?: string): Sequelize {
    try {
      if (dbName) {
        new BaseConnection(dbName);
      } else {
        new BaseConnection(config.db.database);
      }

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
      const tenant = BaseConnection.request?.cookies?.tenant || undefined;
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
}
