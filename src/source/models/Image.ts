import { Model, DataTypes } from "sequelize";
import ITM from "@app/models/ITenantModel";
import { IImage, IImageRelation } from "@app/interfaces/FileInterface";

@ITM.staticImplements<IImage, IImageRelation>()
class Image extends Model implements  IImage{
  declare id?: number;
  declare path: string;
  declare caption: string;
  declare size: number;
  declare imageableType: string;
  declare imageableId: number;
  declare createdAt?: string;
  declare updatedAt?: string;
  declare deletedAt?: string;
  getSearchables(): Array<keyof IImage> {
    return ["caption", "path", "imageableType", "imageableId"];
  }
  getRelations(): (keyof IImageRelation)[] {
    return [];
  }
  static additionalOptions={}
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
