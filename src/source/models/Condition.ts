import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { ICondition, IConditionRelation } from "../utils/SourceInterfaces";

@ITM.staticImplements<ICondition, IConditionRelation>()
export default class Condition extends Model {
  getSearchables(): Array<keyof ICondition> {
    return [
      "initDeadline",
      "initRateMora",
      "finalRateMora",
      "loanId",
      "clientId",
    ];
  }

  getRelations(): (keyof IConditionRelation)[] {
    return ["loan", "client"];
  }

  static tableName = "conditions";
  static modelName = "Condition";

  static attributes = {
    ...ITM.commonAttributes,

    initDeadline: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    initRateMora: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    finalRateMora: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    loanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };
}
