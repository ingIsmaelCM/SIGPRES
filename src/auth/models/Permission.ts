import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import BaseConnection from "@app/db/BaseConnection";
import { IModel } from "@app/models/IModel";

class Permission
  extends Model<
    InferAttributes<Permission>,
    InferCreationAttributes<Permission>
  >
  implements IModel
{
  [x: string]: any;

  declare createdAt: string;
  declare updatedAt: string;

  declare id: string;
  declare name: string;

 static  getSearchables(): string[] {
    return ["name"];
  }
  /* istanbul ignore next */
 static getRelations(): string[] {
    return [];
  }
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    modelName: "Permission",
    tableName: "permissions",
    sequelize: BaseConnection.getConnection(),
    createdAt: false,
    updatedAt: false,
  }
);

export default Permission;
