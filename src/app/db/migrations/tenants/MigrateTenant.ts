import { Sequelize } from "sequelize";
import BaseConnection from "../../BaseConnection";
import path from "path";
import fs from "fs";
import config from "../../../app.config";

export default class MigrateTenant {
  private dbName: string;
  private connection: Sequelize;

  constructor(dbName: string) {
    this.dbName = dbName;
    this.connection = BaseConnection.getConnection(dbName);
  }

  async createDatabase(): Promise<void> {
    try {
      const checkDb = `SELECT SCHEMA_NAME
                       FROM INFORMATION_SCHEMA.SCHEMATA
                        WHERE SCHEMA_NAME = '${this.dbName}'`;
      const result = await BaseConnection.getConnection().query(checkDb);
      if (result[0].length > 0) {
        throw {
          code: 500,
          message: "Esta base de datos ya existe",
        };
      }
      const query = `CREATE DATABASE IF NOT EXISTS ${this.dbName};`;
      await BaseConnection.getConnection(config.db.database).query(query);
      await this.migrateDatabase(this.dbName);
    } catch (error: any) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  }

  private async migrateDatabase(dbName: string): Promise<void> {
    const connection = BaseConnection.getConnection(dbName);
    try {
      const folderPath = __dirname;
      const files = fs.readdirSync(folderPath);
      files.sort();
      for (const file of files) {
        if (file.endsWith(".sql")) {
          this.runSQLFile(path.join(folderPath, file), connection);
        }
      }
    } catch (error: any) {
      throw {
        code: 500,
        message: error.message,
      };
    }
  }
  private async runSQLFile(filePath: string, connection: any): Promise<void> {
    const sql = fs.readFileSync(filePath, { encoding: "utf8" });
    const queries = sql.split(/;\s*$/m); // Divide el script en consultas individuales basándose en punto y coma
    for (const query of queries) {
      if (query.length > 0) {
        try {
          await connection.query(query);
        } catch (error) {
          throw error;
        }
      }
    }
  }
}
