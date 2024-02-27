import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { IJob, IJobRelation } from "../utils/SourceInterfaces";

@ITM.staticImplements<IJob, IJobRelation>()
export default class Job extends Model {
  getSearchables(): Array<keyof IJob> {
    return ["startAt", "salary", "clientId", "company", "infoId", "position"];
  }

  getRelations(): Array<keyof IJobRelation> {
    return ["client", "info", "image", "document"];
  }

  static isTenant = true;
  static tableName = "jobs";
  static modelName = "Job";

  static attributes: Record<keyof IJob, any> = {
    ...ITM.commonAttributes,
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    infoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };
}
