import fs from "fs";
import {col, DataTypes, ModelAttributeColumnOptions, QueryInterface, Sequelize} from "sequelize";
import {Card} from "@source/models";

interface IAddColumn {
    table: string;
    column: string;
    colDefinition: ModelAttributeColumnOptions,
}

export default class MigrateView {
    static async runSQLFile(filePath: string, connection: Sequelize): Promise<void> {
        await this.addColumns(connection);
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


    static async addColumns(connection: Sequelize) {
        const queryInterface = connection.getQueryInterface();
        await this.createCardTable(queryInterface);
        await this.addColumnsIfNotExists(queryInterface, {
            table: 'infos',
            column: 'note',
            colDefinition: {
                type: DataTypes.STRING(150),
                allowNull: true
            },
        });
        await this.addColumnsIfNotExists(queryInterface, {
            table: 'infos',
            column: 'type',
            colDefinition: {
                type: DataTypes.STRING(50),
                defaultValue: 'General',
                allowNull: false
            },
        });
        await this.addColumnsIfNotExists(queryInterface, {
            table: 'payments',
            column: 'mora',
            colDefinition: {
                type: DataTypes.DECIMAL(10,2),
                defaultValue: 0,
                allowNull: false,
            },
        })
    }

    static async addColumnsIfNotExists(queryInterface: QueryInterface, options: IAddColumn) {
        const {table, column, colDefinition} = options;
        const cols = Object.keys((await queryInterface.describeTable(table)));
        if (!cols.includes(column)) {
            await queryInterface.addColumn(table, column, colDefinition);
        }
    }

    static async createCardTable(queryInterface: QueryInterface) {
        try {

            await queryInterface.createTable("cards", Card.attributes, Card.additionalOptions)
                .catch((err: any) => console.log(err))
        } catch (err: any) {
            console.log(err)
        }
    }
}
