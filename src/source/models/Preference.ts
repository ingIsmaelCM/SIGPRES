import { DataTypes, Model } from "sequelize";
import { staticImplements, commonAttributes } from "@app/models/ITenantModel";
import {
  IPreference,
  IPreferenceRelation,
} from "@source/utils/SourceInterfaces";

@staticImplements<IPreference, IPreferenceRelation>()
export default class Preference extends Model {
  getSearchables(): Array<keyof IPreference> {
    return ["key", "value", "label"];
  }
  getRelations(): Array<keyof IPreferenceRelation> {
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
