"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConnection_1 = __importDefault(require("../../BaseConnection"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sequelize_1 = require("sequelize");
const app_config_1 = __importDefault(require("@app/app.config"));
class MigrateTenant {
    dbName;
    constructor(dbName) {
        this.dbName = dbName;
    }
    async createDatabase() {
        try {
            const checkDb = `SELECT SCHEMA_NAME
                       FROM INFORMATION_SCHEMA.SCHEMATA
                        WHERE SCHEMA_NAME = '${this.dbName}'`;
            const result = await BaseConnection_1.default.getConnection().query(checkDb);
            if (result[0].length > 0) {
                await Promise.reject({
                    code: 500,
                    message: "Esta base de datos ya existe",
                });
            }
            const query = `CREATE DATABASE IF NOT EXISTS ${this.dbName};`;
            await BaseConnection_1.default.getConnection().query(query);
            await this.migrateDatabase(this.dbName);
        }
        catch (error) {
            throw {
                code: error.code,
                message: error.message,
            };
        }
    }
    async migrateDatabase(dbName) {
        const connection = new sequelize_1.Sequelize({
            dialect: app_config_1.default.db.dialect,
            host: app_config_1.default.db.host,
            port: app_config_1.default.db.port,
            username: app_config_1.default.db.user,
            password: app_config_1.default.db.password,
            database: dbName,
            logging: app_config_1.default.db.logging,
            timezone: "-04:00"
        });
        try {
            const folderPath = __dirname;
            const files = fs_1.default.readdirSync(folderPath);
            files.sort();
            for (const file of files) {
                if (file.endsWith(".sql")) {
                    await this.runSQLFile(path_1.default.join(folderPath, file), connection);
                }
            }
        }
        catch (error) {
            throw {
                code: 500,
                message: error.message,
            };
        }
    }
    async runSQLFile(filePath, connection) {
        const sql = fs_1.default.readFileSync(filePath, { encoding: "utf8" });
        const queries = sql.split(/;\s*$/m);
        for (const query of queries) {
            if (query.length > 0) {
                try {
                    await connection.query(query);
                }
                catch (error) {
                    throw error;
                }
            }
        }
    }
}
exports.default = MigrateTenant;
//# sourceMappingURL=MigrateTenant.js.map