import {
  DataTypes,
  Model,
  ModelAttributeColumnOptions,
} from "sequelize";
import { IWallet, IWalletRelation } from "@app/interfaces/SourceInterfaces";
import ITM from "@/app/models/ITenantModel";

@ITM.staticImplements<IWallet, IWalletRelation>()
export default class Wallet extends Model implements IWallet {
  declare name: string;
  declare balance: number;
  declare  authId: string;
  declare id?: string;
  declare createdBy?: number;
  declare updatedBy?: number;
  declare createdAt?: string;
  declare updatedAt?: string;
  declare deletedAt?: string;

  static tableName = "wallets";
  static modelName = "Wallet";
  static additionalOptions={}
  getSearchables(): Array<keyof IWallet> {
    return ["name", "balance", "authId"];
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
    authId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      get(this: Wallet){
        return Number(this.getDataValue('balance'))
      }
    },
    ...ITM.commonAttributes,
  };
}
