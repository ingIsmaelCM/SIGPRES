import { Model, DataTypes } from "sequelize";
import ITM from "@/app/models/ITenantModel";
import { IImage, IImageRelation } from "../utils/FileInterface";

@ITM.staticImplements<IImage, IImageRelation>()
class Image extends Model {
  getSearchables(): Array<keyof IImage> {
    return ["caption", "path", "imageableType", "imageableId"];
  }
  getRelations(): (keyof IImageRelation)[] {
    return [];
  }

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
