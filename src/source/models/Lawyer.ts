import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { ILawyer, ILawyerRelation } from "../utils/SourceInterfaces";

@ITM.staticImplements<ILawyer, ILawyerRelation>()
export default class Lawyer extends Model {
  getSearchables(): Array<keyof ILawyer> {
    return ["name", "lastname", "exequatur", "infoId"];
  }

  getRelations(): (keyof ILawyerRelation)[] {
    return ["info", "loans", "payments", "expenses", "image", "document"];
  }

  static tableName = "lawyers";
  static modelName = "Lawyer";

  static attributes: Record<keyof ILawyer, any> = {
    ...ITM.commonAttributes,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    infoId: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    exequatur: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };
}
