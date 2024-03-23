import ITM from "@/app/models/ITenantModel";
import {DataTypes, Model} from "sequelize";
import {EInfoGender, IInfo, IInfoRelation} from "@app/interfaces/SourceInterfaces";
import tools from "@app/utils/tools";

@ITM.staticImplements<IInfo, IInfoRelation>()
export default class Info extends Model implements IInfo {
    [x: string]: any;

    static additionalOptions = {}
    static modelName = "Info";
    static tableName = "infos";
    static attributes: Record<keyof IInfo, any> = {
        ...ITM.commonAttributes,
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        birthdate: {
            type: DataTypes.DATE,
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
    };
    declare setClient: Function;
    declare setContact: Function;
    declare setLawyer: Function;
    declare setJob: Function;
    declare dni: string;
    declare phone: string;
    declare email?: string;
    declare birthdate?: string;
    declare address?: string;
    declare gender: EInfoGender;
    declare country: string;
    declare id?: number;
    declare createdBy?: number;
    declare updatedBy?: number;
    declare createdAt?: string;
    declare updatedAt?: string;
    declare deletedAt?: string;

    getSearchables(): Array<keyof IInfo> {
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

    getRelations(): (keyof IInfoRelation)[] {
        return ["image", "document"];
    }
}
