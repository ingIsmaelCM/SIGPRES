import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { ITenantModel } from "@/app/models/ITenantModel";

class Image
  extends Model<InferAttributes<Image>, InferCreationAttributes<Image>>
  implements ITenantModel
{
  getSearchables(): string[] {
    return ["caption", "path", "imageableType", "imageableId"];
  }
  getRelations(): string[] {
    return ["transaction"];
  }
  static isTenant = true;
  static attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    path: {
      type: DataTypes.STRING,
    },
    caption: {
      type: DataTypes.STRING,
      defaultValue: new Date(),
    },
    size: {
      type: DataTypes.DECIMAL,
    },
    imageableType: {
      type: DataTypes.STRING,
    },
    imageableId: {
      type: DataTypes.INTEGER,
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
  static modelName = "Image";
  static tableName = "images";
}

export default Image;
