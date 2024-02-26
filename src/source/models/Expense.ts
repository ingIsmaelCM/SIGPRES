import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { IExpense, IExpenseRelation } from "../utils/SourceInterfaces";

@ITM.staticImplements<IExpense, IExpenseRelation>()
export default class Expense extends Model {
  getSearchables(): string[] {
    return ["amount", "date", "concepto", "walletId", "lawyerId"];
  }

  getRelations(): Array<keyof IExpenseRelation> {
    return ["wallet", "lawyer"];
  }

  static isTenant = true;
  static modelName = "Expense";
  static tableName = "expenses";

  static attributes = {
    ...ITM.commonAttributes,
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    concepto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lawyerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  };
}
