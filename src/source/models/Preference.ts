import { DataTypes, Model } from "sequelize";
import { staticImplements, commonAttributes } from "@app/models/ITenantModel";
import {
  IPreference,
  IPreferenceRelation,
} from "@app/interfaces/SourceInterfaces";

@staticImplements<IPreference, IPreferenceRelation>()
export default class Preference extends Model implements  IPreference{

  declare key: string;
  declare label: string;
  declare value: string;
  declare type: string;

 static  getSearchables(): Array<keyof IPreference> {
    return ["key", "value", "label"];
  }
 static getRelations(): Array<keyof IPreferenceRelation> {
    return [];
  }
  static modelName = "Preference";
  static tableName = "preferences";
  static additionalOptions={}
  static attributes = {
    key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT("long"),
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ...commonAttributes,
  };
}
