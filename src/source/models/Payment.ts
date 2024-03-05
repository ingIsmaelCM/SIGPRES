import { DataTypes, Model } from "sequelize";
import { IPayment, IPaymentRelation } from "../utils/SourceInterfaces";
import ITM from "@/app/models/ITenantModel";

@ITM.staticImplements<IPayment, IPaymentRelation>()
export default class Payment extends Model implements IPayment {
  declare amount: number;
  declare capital: number;
  declare interest: number;
  declare balanceBefore: number;
  declare balanceAfter: number;
  declare dueAt: string;
  declare payedAt: string;
  declare note?: string;
  declare walletId: number;
  declare loanId: number;
  declare clientId: null;
  declare lawyerId?: number;
  declare id?: number;
  declare createdBy?: number;
  declare updatedBy?: number;
  declare createdAt?: string;
  declare updatedAt?: string;
  declare deletedAt?: string;

  getSearchables(): (keyof IPayment)[] {
    return [
      "amount",
      "capital",
      "interest",
      "balanceBefore",
      "balanceAfter",
      "dueAt",
      "payedAt",
      "note",
      "walletId",
      "loanId",
      "clientId",
      "lawyerId",
    ];
  }

  getRelations(): (keyof IPaymentRelation)[] {
    return ["wallet", "loan", "lawyer", "client", "mora", "images"];
  }

  static tableName = "payments";
  static modelName = "Payment";

  static attributes: Record<keyof IPayment, any> = {
    ...ITM.commonAttributes,
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    capital: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    interest: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    balanceBefore: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    balanceAfter: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    dueAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    walletId: {
      type: DataTypes.INTEGER,
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
    lawyerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  };
}