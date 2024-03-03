import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { ELoanStatus, ILoan, ILoanRelation } from "../utils/SourceInterfaces";

@ITM.staticImplements<ILoan, ILoanRelation>()
export default class Loan extends Model implements ILoan {
  declare amount: number;
  declare balance: number;
  declare startAt: string;
  declare endAt: string;
  declare rate: number;
  declare deadlines: number;
  declare grace: number;
  declare status: ELoanStatus;
  declare period: string;
  declare clientId: number;
  declare lawyerId: number;
  declare walletId: number;
  declare guarantorId: number;
  declare id?: number;
  declare createdBy?: number;
  declare updatedBy?: number;
  declare createdAt?: string;
  declare updatedAt?: string;
  declare deletedAt?: string;

  static tableName = "loans";
  static modelName = "Loan";

  getSearchables(): Array<keyof ILoan> {
    return [
      "clientId",
      "lawyerId",
      "amount",
      "balance",
      "startAt",
      "endAt",
      "grace",
      "rate",
    ];
  }

  getRelations(): Array<keyof ILoanRelation> {
    return [
      "lawyer",
      "guarantor",
      "client",
      "condition",
      "images",
      "documents",
      "payments",
      "moras",
      "amortizations",
    ];
  }

  static attributes: Record<keyof ILoan, any> = {
    ...ITM.commonAttributes,
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    grace: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    deadlines: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ELoanStatus)),
      allowNull: false,
      defaultValue: ELoanStatus.Pendiente,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lawyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guarantorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  };
}
