import BaseConnection from "@/app/db/BaseConnection";
import { IModel } from "@/app/models/IModel";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class Tenant
  extends Model<InferAttributes<Tenant>, InferCreationAttributes<Tenant>>
  implements IModel
{
  declare id: string;
  declare name: string;
  declare key: string;

  declare createdAt: string;
  declare updatedAt: string;

  getRelations(): string[] {
    return ["auths"];
  }

  getSearchables(): string[] {
    return ["name", "key"];
  }
}

Tenant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    createdAt: {
      type: DataTypes.DATEONLY,
    },

    updatedAt: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    modelName: "Tenant",
    tableName: "tenants",
    sequelize: BaseConnection.getConnection(),
    paranoid: true,
  }
);

export default Tenant;
