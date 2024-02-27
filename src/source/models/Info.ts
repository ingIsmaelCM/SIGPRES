import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { IInfo, IInfoRelation } from "../utils/SourceInterfaces";

@ITM.staticImplements<IInfo, IInfoRelation>()
export default class Info extends Model {
  getSearchables(): Array<keyof IInfo> {
    return ["dni", "phone", "email", "birthdate", "address"];
  }

  getRelations(): (keyof IInfoRelation)[] {
    return ["image", "document"];
  }

  static isTenant = true;
  static modelName = "Info";
  static tableName = "infos";

  static attributes: Record<keyof IInfo, any> = {
    ...ITM.commonAttributes,
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
}
