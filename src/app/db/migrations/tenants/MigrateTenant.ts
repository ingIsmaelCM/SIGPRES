import BaseConnection from "../../BaseConnection";
import path from "path";
import fs from "fs";
import {Sequelize} from "sequelize";
import config from "@app/app.config";

export default class MigrateTenant {
    private readonly dbName: string;

    constructor(dbName: string) {
        this.dbName = dbName;
    }

    async createDatabase(): Promise<void> {
        try {
            const checkDb = `SELECT SCHEMA_NAME
                       FROM INFORMATION_SCHEMA.SCHEMATA
                        WHERE SCHEMA_NAME = '${this.dbName}'`;
            const result = await BaseConnection.getConnection().query(checkDb);
            if (result[0].length > 0) {
                await Promise.reject({
                    code: 500,
                    message: "Esta base de datos ya existe",
                });
            }
            const query = `CREATE DATABASE IF NOT EXISTS ${this.dbName};`;
            await BaseConnection.getConnection().query(query);
            await this.migrateDatabase(this.dbName);
        } catch (error: any) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }

    private async migrateDatabase(dbName: string): Promise<void> {
        const connection = new Sequelize({
            dialect: config.db.dialect,
            host: config.db.host,
            port: config.db.port,
            username: config.db.user,
            password: config.db.password,
            database: dbName,
            logging: config.db.logging,
            timezone: "-04:00"
        });
        try {
            const folderPath = __dirname;
            await this.runSQLFile(path.join(folderPath, "database.sql"), connection);
        } catch (error: any) {
            throw {
                code: 500,
                message: error.message,
            };
        }
    }

    private async runSQLFile(filePath: string, connection: any): Promise<void> {
        const sql = fs.readFileSync(filePath, {encoding: "utf8"});
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
