import ITM from "@/app/models/ITenantModel";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import {
  IAmortization,
  IAmortizationRelation,
} from "../utils/SourceInterfaces";

@ITM.staticImplements<IAmortization, IAmortizationRelation>()
export default class Amortization extends Model {
  getSearchables(): Array<keyof IAmortization> {
    return [
      "date",
      "cuota",
      "capital",
      "interest",
      "balance",
      "status",
      "loanId",
      "clientId",
    ];
  }

  getRelations(): Array<keyof IAmortizationRelation> {
    return ["loan", "client"];
  }

  static tableName = "amortizations";
  static modelName = "Amortization";

  static attributes: Record<keyof IAmortization, any> = {
    ...ITM.commonAttributes,
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cuota: {
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
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pendiente", "Pagado", "Cancelado"),
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
