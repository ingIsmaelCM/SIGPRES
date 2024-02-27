import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { IClient, IClientRelation } from "@source/utils/SourceInterfaces";

@ITM.staticImplements<IClient, IClientRelation>()
export default class Client extends Model {
  getSearchables(): Array<keyof IClient> {
    return ["name", "lastname", "infoId"];
  }

  getRelations(): (keyof IClientRelation)[] {
    return ["info", "loans", "moras", "payments"];
  }

  static tableName = "clients";
  static modelName = "Client";
  static isTenant = true;

  static attributes = {
    ...ITM.commonAttributes,
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
  };
}
