import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { IExpense, IExpenseRelation } from "@app/interfaces/SourceInterfaces";
import {Lawyer, Wallet} from "@source/models/index";

@ITM.staticImplements<IExpense, IExpenseRelation>()
export default class Expense extends Model implements  IExpense{
  declare amount: number;
  declare date: string;
  declare concepto: string;
  declare walletId: string;
  declare lawyerId: string | undefined;

  getSearchables(): Array<keyof IExpense> {
    return ["amount", "date", "concepto", "walletId", "lawyerId"];
  }

  getRelations(): Array<keyof IExpenseRelation> {
    return ["wallet", "lawyer"];
  }
  static additionalOptions={}
  static modelName = "Expense";
  static tableName = "expenses";

  static attributes = {
    ...ITM.commonAttributes,
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
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

  static initRelation(){
    Expense.belongsTo(Wallet,{
      as: "wallet",
      foreignKey: 'walletId'
    })
    Expense.belongsTo(Lawyer,{
      as: "lawyer",
      foreignKey: 'lawyerId'
    })
  }
}
