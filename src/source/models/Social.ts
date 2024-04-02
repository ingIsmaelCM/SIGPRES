import {ISocial, ISocialRelation} from "@app/interfaces/SourceInterfaces";
import {Model, ModelAttributeColumnOptions, DataTypes} from "sequelize"
import ITM from "@app/models/ITenantModel";

@ITM.staticImplements<ISocial, ISocialRelation>()
export default class Social extends Model implements ISocial {
    declare clientId: string;
    declare createdAt: string;
    declare createdBy: number;
    declare deletedAt: string;
    declare facebook: string;
    declare Id: string;
    declare instagram: string;
    declare updatedAt: string;
    declare updatedBy: number;
    declare whatsapp: string;

    static tableName = "socials";
    static modelName = "Social";
    static additionalOptions={}
    getSearchables(): Array<keyof ISocial> {
        return [
            "facebook", "instagram", "whatsapp"
        ]
    }

    getRelations(): Array<keyof ISocialRelation> {
        return ["client"]
    }

    static attributes: Record<keyof ISocial, ModelAttributeColumnOptions> =
        {
            facebook: {
                type: DataTypes.STRING,
                allowNull: true
            },
            instagram: {
                type: DataTypes.STRING,
                allowNull: true
            },
            whatsapp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            clientId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ...ITM.commonAttributes
        }


}