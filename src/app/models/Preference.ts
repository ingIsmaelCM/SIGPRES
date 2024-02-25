import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { IModel } from "./IModel";
import BaseConnection from "../db/BaseConnection";

class Preference
  extends Model<
    InferAttributes<Preference>,
    InferCreationAttributes<Preference>
  >
  implements IModel
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
}

Preference.init(
  {
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
  },
  {
    sequelize: BaseConnection.getConnection(),
    tableName: "app__preferences",
    modelName: "Preference",
    paranoid: true,
  }
);

export default Preference;
