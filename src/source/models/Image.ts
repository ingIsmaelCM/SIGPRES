import { Model, DataTypes } from "sequelize";
import ITM from "@app/models/ITenantModel";
import { IImage, IImageRelation } from "@app/interfaces/FileInterface";

@ITM.staticImplements<IImage, IImageRelation>()
class Image extends Model implements  IImage{
  declare id?: string;
  declare path: string;
  declare caption: string;
  declare publicId: string;
  declare size: number;
  declare imageableType: string;
  declare imageableId: string;
  declare createdAt?: string;
  declare updatedAt?: string;
  declare deletedAt?: string;
 static  getSearchables(): Array<keyof IImage> {
    return ["caption", "path", "imageableType", "imageableId"];
  }
 static getRelations(): (keyof IImageRelation)[] {
    return [];
  }
  static additionalOptions={}
  static attributes = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    path: {
      type: DataTypes.STRING,
    },
    caption: {
      type: DataTypes.STRING,
      defaultValue: new Date().getTime().toString(),
    },
    publicId: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.DECIMAL,
    },
    imageableType: {
      type: DataTypes.STRING,
    },
    imageableId: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
    },
    deletedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  };
  static modelName = "Image";
  static tableName = "images";
}

export default Image;
