import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { IModel } from "@app/models/IModel";
import BaseConnection from "@app/db/BaseConnection";

class Auth
  extends Model<InferAttributes<Auth>, InferCreationAttributes<Auth>>
  implements IModel
{
  [x: string]: any;
  declare id: number;
  declare email: string;
  declare username: string;
  declare password: string;
  declare name: string;
  declare lastname: string;
  declare lastlogin: string;
  declare sessionId: string;
  declare status: number;
  declare verifiedAt: string;
  declare createdAt: string;
  declare updatedAt: string;
  declare deletedAt: string;

  getSearchables() {
    return ["email", "username", "lastLogin", "verifiedAt", "status"];
  }
  /* istanbul ignore next */
  getRelations() {
    return [
      "roles",
      "roles.auths",
      "roles.permissions",
      "permissions",
      "tenants",
    ];
  }
}

Auth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return undefined;
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastlogin: {
      type: DataTypes.DATE,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: "auths",
    modelName: "Auth",
    paranoid: true,
  }
);

export default Auth;
