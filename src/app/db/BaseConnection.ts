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

  /**
   * Creates a new instance of the database connection.
   * @param dbName The name of the database to connect to. If not specified, the default database will be used.
   * @returns The database connection.
   */
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

  /**
   * Gets a new transaction instance.
   * Set BaseConnection.request as null for use Default Database
   * @returns The transaction instance.
   */
  static async getTrans(dbDefault: boolean = false) {
    try {
      const tenant = dbDefault
        ? null
        : BaseConnection.request?.cookies?.tenant || undefined;
      console.log(tenant);
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
