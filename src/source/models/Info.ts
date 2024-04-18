import ITM from "@/app/models/ITenantModel";
import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import {EInfoGender, IInfo, IInfoRelation} from "@app/interfaces/SourceInterfaces";
import tools from "@app/utils/tools";

@ITM.staticImplements<IInfo, IInfoRelation>()
export default class Info extends Model implements IInfo {
    [x: string]: any;

    static additionalOptions = {}
    static modelName = "Info";
    static tableName = "infos";
    static attributes: Record<keyof IInfo, ModelAttributeColumnOptions> = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4

        },
        dni: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            set(this: Info, value: string) {
                if (value) {
                    this.setDataValue("address", tools.initialToUpper(value))
                }
            }
        },
        gender: {
            type: DataTypes.ENUM,
            values: Object.values(EInfoGender),
            allowNull: false,
            defaultValue: EInfoGender.Ninguno,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "República Dominicana",
            set(this: Info, value: string) {
                this.setDataValue("country", tools.initialToUpper(value))
            }
        },
        createdBy: {
            type: DataTypes.INTEGER,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    };
    declare dni: string;
    declare phone: string;
    declare email?: string;
    declare birthdate?: string;
    declare address?: string;
    declare gender: EInfoGender;
    declare country: string;
    declare id: string;
    declare createdBy?: number;
    declare updatedBy?: number;
    declare createdAt?: string;
    declare updatedAt?: string;
    declare deletedAt?: string;

   static  getSearchables(): Array<keyof IInfo> {
        return [
            "dni",
            "phone",
            "email",
            "birthdate",
            "address",
            "gender",
            "country",
        ];
    }

   static getRelations(): (keyof IInfoRelation)[] {
        return ["image", "document"];
    }
}
