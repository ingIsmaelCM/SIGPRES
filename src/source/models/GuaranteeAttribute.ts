import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import {
    EGuaranteeAttributeType,
    IGuaranteeAttribute,
    IGuaranteeAttributeRelation
} from "@app/interfaces/SourceInterfaces";
import ITM from "@app/models/ITenantModel";

@ITM.staticImplements<IGuaranteeAttribute, IGuaranteeAttributeRelation>()
export default class GuaranteeAttribute extends Model implements IGuaranteeAttribute {
    declare createdAt: string;
    declare createdBy: string;
    declare deletedAt: string;
    declare id: string;
    declare name: string;
    declare options: string;
    declare type: EGuaranteeAttributeType;
    declare updatedAt: string;
    declare updatedBy: string;


    static tableName = "guarantee_attributes";
    static modelName = "GuaranteeAttribute";
    static additionalOptions = {};
    static attributes: Record<keyof IGuaranteeAttribute, ModelAttributeColumnOptions> = {
        name: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM(...Object.values(EGuaranteeAttributeType)),
            allowNull: false
        },
        options: {
            type: DataTypes.STRING,
            allowNull: true,
            get(this: GuaranteeAttribute) {
                return (<string>this.getDataValue("options"))?.split(',')
            }
        },
        ...ITM.commonAttributes
    }

    static getSearchables(): Array<keyof IGuaranteeAttribute> {
        return ["name", "type", "options"]
    }

    static getRelations(): Array<keyof IGuaranteeAttributeRelation> {
        return []
    }
}