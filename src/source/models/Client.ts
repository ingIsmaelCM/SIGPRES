import ITM from "@/app/models/ITenantModel";
import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import {
    EClientType,
    IClient,
    IClientRelation,
} from "@app/interfaces/SourceInterfaces";
import tools from "@app/utils/tools";
import Info from "@source/models/Info";

@ITM.staticImplements<IClient, IClientRelation>()
export default class Client extends Model implements IClient {
    declare name: string;
    declare code?: string;
    declare lastname: string;
    declare infoId?: string;
    declare clienttype: EClientType;
    declare id?: string;
    declare createdBy?: number;
    declare updatedBy?: number;
    declare createdAt?: string;
    declare updatedAt?: string;
    declare deletedAt?: string;

   static  getSearchables(): Array<keyof IClient> {
        return ["code", "name", "lastname", "infoId", "clienttype"];
    }

   static getRelations(): (keyof IClientRelation)[] {
        return [
            "info",
            "loans",
            "moras",
            "payments",
            "images",
            "documents",
            "profile",
            "contacts",
            "jobs",
            "contacts.info",
            "jobs.info",
            "loans.payments",
            "payments.mora"
        ];
    }
    static tableName = "clients";
    static modelName = "Client";
    static additionalOptions={

    }
    static attributes: Record<keyof IClient, ModelAttributeColumnOptions> = {
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            set(this: Client, value: string){
                this.setDataValue("name",tools.initialToUpper(value))
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            set(this: Client, value: string){
                this.setDataValue("lastname",tools.initialToUpper(value))
            }
        },
        infoId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clienttype: {
            type: DataTypes.ENUM(...Object.values(EClientType)),
            allowNull: false,
            defaultValue: EClientType.Persona,
        },
        fullname: {
            type: DataTypes.VIRTUAL,
            get(this: Client) {
                return `${this.name} ${this.lastname}`;
            },
        },
        ...ITM.commonAttributes,
    };
}
/*

FIXED Add clienttype `[Personal, Negocio]
TODO: create guarantees table (name, description) (relation image or document) status (consignado, devuelto), type (física, nominal)
*/
