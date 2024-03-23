import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { ILawyer, ILawyerRelation } from "@app/interfaces/SourceInterfaces";

@ITM.staticImplements<ILawyer, ILawyerRelation>()
export default class Lawyer extends Model implements  ILawyer{

  declare name:string;
  declare lastname:string;
  declare fullname?:string;
  declare infoId?: number;

  getSearchables(): Array<keyof ILawyer> {
    return ["name", "lastname", "exequatur", "infoId"];
  }

  getRelations(): (keyof ILawyerRelation)[] {
    return ["info", "loans", "payments", "expenses", "image", "document"];
  }
  static additionalOptions={}
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
    fullname: {
      type: DataTypes.VIRTUAL,
      get(this: Lawyer) {
        return `${this.name} ${this.lastname}`;
      },
    },
  };
}
