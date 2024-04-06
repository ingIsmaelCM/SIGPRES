import { DataTypes, Model } from "sequelize";
import { IPayment, IPaymentRelation } from "@app/interfaces/SourceInterfaces";
import ITM from "@/app/models/ITenantModel";
import {Wallet, Mora, Loan, Client} from "@source/models/index";

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
  declare walletId: string;
  declare loanId: string;
  declare clientId: string;
  declare lawyerId?: string;
  declare id?: string;
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
    return ["wallet", "loan", "lawyer", "client", "mora", "images", "loan.client","loan.condition","loan.wallet"];
  }

  static tableName = "payments";
  static modelName = "Payment";
  static additionalOptions={}
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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    payedAt: {
      type: DataTypes.DATEONLY,
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

  static initRelation(){

    Payment.hasOne(Mora,{
      foreignKey:"paymentId",
      as: "mora"
    })

    Payment.belongsTo(Wallet, {
      foreignKey: "walletId",
      as: "wallet"
    })

    Payment.belongsTo(Loan, {
      foreignKey: "loanId",
      as: "loan"
    })

    Payment.belongsTo(Client, {
      foreignKey: "clientId",
      as: "client"
    })
  }
}
