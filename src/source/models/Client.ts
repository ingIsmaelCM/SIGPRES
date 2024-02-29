import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import {
  EClientType,
  IClient,
  IClientRelation,
} from "@source/utils/SourceInterfaces";

@ITM.staticImplements<IClient, IClientRelation>()
export default class Client extends Model {
  getSearchables(): Array<keyof IClient> {
    return ["code", "name", "lastname", "infoId", "clienttype"];
  }

  getRelations(): (keyof IClientRelation)[] {
    return ["info", "loans", "moras", "payments"];
  }

  static tableName = "clients";
  static modelName = "Client";
  static isTenant = true;

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
  };
}

/* 

FIXED Add clienttype `[Personal, Negocio]
TODO: create guarantees table (name, description) (relation image or document) status (consignado, devuelto), type (física, nominal)
*/
