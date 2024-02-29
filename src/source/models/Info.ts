import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { IInfo, IInfoRelation } from "../utils/SourceInterfaces";

@ITM.staticImplements<IInfo, IInfoRelation>()
export default class Info extends Model implements IInfo {
  declare setClient: Function;
  declare dni: string;
  declare phone: string;
  declare email?: string;
  declare birthdate?: string;
  declare address?: string;
  declare id?: number;
  declare createdBy?: number;
  declare updatedBy?: number;
  declare createdAt?: string;
  declare updatedAt?: string;
  declare deletedAt?: string;
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
    },
  };
}
