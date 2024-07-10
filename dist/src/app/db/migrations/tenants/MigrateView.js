"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sequelize_1 = require("sequelize");
const models_1 = require("@source/models");
const Guarantee_1 = __importDefault(require("@source/models/Guarantee"));
class MigrateView {
    static async runSQLFile(filePath, connection) {
        await this.addColumns(connection);
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
    static async addColumns(connection) {
        const queryInterface = connection.getQueryInterface();
        await this.createCardTable(queryInterface);
        await this.createGuaranteeTable(queryInterface);
        await this.createAttributeTable(queryInterface);
        await this.addColumnsIfNotExists(queryInterface, {
            table: 'infos',
            column: 'note',
            colDefinition: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true
            },
        });
        await this.addColumnsIfNotExists(queryInterface, {
            table: 'infos',
            column: 'type',
            colDefinition: {
                type: sequelize_1.DataTypes.STRING(50),
                defaultValue: 'General',
                allowNull: false
            },
        });
        await this.addColumnsIfNotExists(queryInterface, {
            table: 'payments',
            column: 'mora',
            colDefinition: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                defaultValue: 0,
                allowNull: false,
            },
        });
    }
    static async addColumnsIfNotExists(queryInterface, options) {
        const { table, column, colDefinition } = options;
        const cols = Object.keys((await queryInterface.describeTable(table)));
        if (!cols.includes(column)) {
            await queryInterface.addColumn(table, column, colDefinition);
        }
    }
    static async createCardTable(queryInterface) {
        try {
            await queryInterface.createTable(models_1.Card.tableName, models_1.Card.attributes, models_1.Card.additionalOptions)
                .catch((err) => console.log(err));
        }
        catch (err) {
            console.log(err);
        }
    }
    static async createGuaranteeTable(queryInterface) {
        try {
            await queryInterface.createTable(Guarantee_1.default.tableName, Guarantee_1.default.attributes, Guarantee_1.default.additionalOptions)
                .catch((err) => console.log(err));
        }
        catch (err) {
            console.log(err);
        }
    }
    static async createAttributeTable(queryInterface) {
        try {
            await queryInterface.createTable(models_1.Attribute.tableName, models_1.Attribute.attributes, models_1.Attribute.additionalOptions)
                .catch((err) => console.log(err));
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.default = MigrateView;
//# sourceMappingURL=MigrateView.js.map