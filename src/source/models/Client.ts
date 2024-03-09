import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import {
  EClientType,
  IClient,
  IClientRelation,
} from "@source/utils/SourceInterfaces";

@ITM.staticImplements<IClient, IClientRelation>()
export default class Client extends Model implements IClient {
  declare name: string;
  declare code?: string;
  declare lastname: string;
  declare infoId?: number;
  declare clienttype: EClientType;
  declare id?: number;
  declare createdBy?: number;
  declare updatedBy?: number;
  declare createdAt?: string;
  declare updatedAt?: string;
  declare deletedAt?: string;
  getSearchables(): Array<keyof IClient> {
    return ["code", "name", "lastname", "infoId", "clienttype"];
  }

  getRelations(): (keyof IClientRelation)[] {
    return [
      "info",
      "loans",
      "moras",
      "payments",
      "images",
      "profile",
      "contacts",
        "jobs"
    ];
  }

  static tableName = "clients";
  static modelName = "Client";

  static attributes = {
    ...ITM.commonAttributes,
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    infoId: {
      type: DataTypes.NUMBER,
      allowNull: true,
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
  };
}

/* 

FIXED Add clienttype `[Personal, Negocio]
TODO: create guarantees table (name, description) (relation image or document) status (consignado, devuelto), type (física, nominal)
*/
