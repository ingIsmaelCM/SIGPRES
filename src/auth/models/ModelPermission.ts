import BaseConnection from "@app/db/BaseConnection";
import {DataTypes} from "sequelize";

const ModelPermission = BaseConnection.getConnection().define(
    "ModelPermission",
    {
        modelType: DataTypes.STRING,
        permissionId: DataTypes.STRING,
        modelId: DataTypes.STRING
    },
    {
        tableName: "model_permissions",
        freezeTableName: true,
        paranoid: false,
    }
);

export default ModelPermission;
