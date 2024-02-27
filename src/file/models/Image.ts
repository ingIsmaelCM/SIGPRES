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
  static isTenant = true;
  static attributes = {
    ...ITM.commonAttributes,
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
  };
  static modelName = "Image";
  static tableName = "images";
}

export default Image;
