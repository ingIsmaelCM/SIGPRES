import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import BaseConnection from "@app/db/BaseConnection";
import { IModel } from "@app/models/IModel";

class Role
  extends Model<InferAttributes<Role>, InferCreationAttributes<Role>>
  implements IModel
{
  [x: string]: any;
  declare createdAt: string;
  declare updatedAt: string;

  declare id: number;
  declare name: string;

  getSearchables(): string[] {
    return ["name"];
  }
  /* istanbul ignore next */
  getRelations(): string[] {
    return ["auths", "auths.user"];
  }
}

Role.init(
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
    modelName: "Role",
    tableName: "roles",
    sequelize: BaseConnection.getConnection(),
    createdAt: false,
    updatedAt: false,
  }
);

export default Role;
