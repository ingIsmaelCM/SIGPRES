import BaseConnection from "@app/db/BaseConnection";
import { DataTypes } from "sequelize";

const ModelPermission = BaseConnection.getConnection().define(
  "ModelPermission",
  {
    modelType: DataTypes.STRING,
  },
  {
    tableName: "model_permissions",
    paranoid: true,
  }
);

export default ModelPermission;
