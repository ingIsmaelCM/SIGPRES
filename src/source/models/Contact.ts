import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { IContact, IContactRelation } from "../utils/SourceInterfaces";

@ITM.staticImplements<IContact, IContactRelation>()
export default class Contact extends Model {
  getSearchables(): Array<keyof IContact> {
    return ["name", "lastname", "infoId"];
  }

  getRelations(): (keyof IContactRelation)[] {
    return ["clients", "info"];
  }

  static tableName = "contacts";
  static modelName = "Contact";

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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  };
}
