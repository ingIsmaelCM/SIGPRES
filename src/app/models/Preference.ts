import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { ITenantModel } from "@app/models/ITenantModel";
import BaseConnection from "../db/BaseConnection";

class Preference
  extends Model<
    InferAttributes<Preference>,
    InferCreationAttributes<Preference>
  >
  implements ITenantModel
{
  declare id: number;
  declare key: string;
  declare value: number;

  declare createdBy: number;
  declare updatedBy: number;

  declare createdAt: string;
  declare updatedAt: string;
  declare deletedAt: string;

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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    createdBy: {
      type: DataTypes.INTEGER,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  };
}

export default Preference;
