import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import {
    EAttributeType,
    IAttribute,
    IAttributeRelation
} from "@app/interfaces/SourceInterfaces";
import ITM from "@app/models/ITenantModel";
import tools from "@app/utils/tools";

@ITM.staticImplements<IAttribute, IAttributeRelation>()
export default class Attribute extends Model implements IAttribute {
    declare createdAt: string;
    declare createdBy: string;
    declare deletedAt: string;
    declare id: string;
    declare name: string;
    declare options: string;
    declare type: EAttributeType;
    declare updatedAt: string;
    declare updatedBy: string;


    static tableName = "attributes";
    static modelName = "Attribute";
    static additionalOptions = {};
    static attributes: Record<keyof IAttribute, ModelAttributeColumnOptions> = {
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
            unique: true,
            set(this: Attribute, val: string) {
                this.setDataValue("name", tools.initialToUpper(val));
            }
        },
        type: {
            type: DataTypes.ENUM(...Object.values(EAttributeType)),
            allowNull: false
        },
        options: {
            type: DataTypes.STRING,
            allowNull: true,
            set(this: Attribute, val: string[]) {
                this.setDataValue("options", tools.initialToUpper(val.join(', ')));
            }
        },
        ...ITM.commonAttributes
    }

    static getSearchables(): Array<keyof IAttribute> {
        return ["name", "type", "options"]
    }

    static getRelations(): Array<keyof IAttributeRelation> {
        return []
    }
}