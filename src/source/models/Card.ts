import {DataTypes, Model, ModelAttributeColumnOptions, Sequelize} from "sequelize";
import {ICard, ICardRelation,} from "@app/interfaces/SourceInterfaces";
import ITM from "@app/models/ITenantModel";
import jwt from "jsonwebtoken";
import tools from "@app/utils/tools";

@ITM.staticImplements<ICard, ICardRelation>()
export default class Card extends Model implements ICard {
    declare clientId: string;
    declare createdAt: string;
    declare createdBy: number;
    declare deletedAt: string;
    declare id: string;
    declare updatedAt: string;
    declare updatedBy: number;
    declare value: string;
    declare holdname: string;
    declare ending: number;
    declare brand: string;
    static tableName = "cards";
    static modelName = "Card";
    static additionalOptions = {};
    static attributes: Record<keyof ICard, ModelAttributeColumnOptions> = {
        value: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
            get(this: Card) {
                const tenant = this.sequelize?.getDatabaseName();
                return jwt.verify(this.getDataValue('value'), tenant);
            }
        },
        ending: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
            set(this: Card, val: string) {
                this.setDataValue("brand", tools.initialToUpper(val))
            }
        },
        holdname: {
            type: DataTypes.STRING,
            allowNull: false,
            set(this: Card, val: string) {
                this.setDataValue("holdname", tools.initialToUpper(val))
            }
        },
        clientId: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },
        ...ITM.commonAttributes,
    }

    static getSearchables(): Array<keyof ICard> {
        return [
            'value', "clientId", "ending", "brand"
        ];
    }

    static getRelations(): (keyof ICardRelation)[] {
        return ["client"];
    }

    static initRelation(sequelize: Sequelize) {
        sequelize.model("Card")
            .belongsTo(sequelize.model("Client"), {
                as: "client",
                foreignKey: "clientId",
                targetKey: "id",
                onDelete: 'Cascade'
            });
    }

}