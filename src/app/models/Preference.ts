import { DataTypes, Model } from "sequelize";
import { staticImplements, commonAttributes } from "./ITenantModel";
import { IPreference } from "../utils/AppInterfaces";

@staticImplements<IPreference>()
export default class Preference extends Model {
  getSearchables(): string[] {
    return ["key", "value"];
  }
  getRelations(): string[] {
    return [];
  }
  static isTenant = true;
  static modelName = "Preference";
  static tableName = "preferences";
  static attributes = {
    key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    label: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ...commonAttributes,
  };
}
