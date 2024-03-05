import {
  DataTypes,
  Model,
  ModelAttributeColumnOptions,
} from "sequelize";
import { IWallet, IWalletRelation } from "../utils/SourceInterfaces";
import ITM from "@/app/models/ITenantModel";

@ITM.staticImplements<IWallet, IWalletRelation>()
export default class Wallet extends Model implements IWallet {
  declare name: string;
  declare balance: number;
  declare id?: number;
  declare createdBy?: number;
  declare updatedBy?: number;
  declare createdAt?: string;
  declare updatedAt?: string;
  declare deletedAt?: string;

  static tableName = "wallets";
  static modelName = "Wallet";

  getSearchables(): Array<keyof IWallet> {
    return ["name", "balance"];
  }

  getRelations(): Array<keyof IWalletRelation> {
    return ["expenses", "payments", "loans"];
  }

  static attributes: Record<keyof IWallet, ModelAttributeColumnOptions> = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    ...ITM.commonAttributes,
  };
}
