import ITM from "@/app/models/ITenantModel";
import {
    DataTypes,
    Model, ModelAttributeColumnOptions,
} from "sequelize";
import {
    EAmortizationStatus,
    IAmortization,
    IAmortizationRelation,
} from "@app/interfaces/SourceInterfaces";

@ITM.staticImplements<IAmortization, IAmortizationRelation>()
export default class Amortization extends Model implements IAmortization {
    declare date: string;
    declare cuota: number;
    declare nro: number;
    declare capital: number;
    declare interest: number;
    declare mora: number;
    declare balance: number;
    declare status: EAmortizationStatus;
    declare loanId: string;
    declare clientId: string;
    declare id: string;

   static  getSearchables(): Array<keyof IAmortization> {
        return [
            "date",
            "nro",
            "cuota",
            "capital",
            "interest",
            "balance",
            "status",
            "loanId",
            "clientId",
        ];
    }

   static getRelations(): Array<keyof IAmortizationRelation> {
        return ["loan", "client"];
    }

    static additionalOptions = {}
    static tableName = "amortizations";
    static modelName = "Amortization";

    static attributes: Record<keyof IAmortization, ModelAttributeColumnOptions> = {
        ...ITM.commonAttributes,
        nro: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        cuota: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: Amortization){
                return Number(this.getDataValue("cuota"))
            }
        },
        capital: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: Amortization){
                return Number(this.getDataValue("capital"))
            }
        },
        interest: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: Amortization){
                return Number(this.getDataValue("interest"))
            }
        },
        mora: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0,
            get(this: Amortization){
                return Number(this.getDataValue("mora"))
            }
        },
        balance: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: Amortization){
                return Number(this.getDataValue("balance"))
            }
        },
        status: {
            type: DataTypes.ENUM("Pendiente", "Pagado", "Cancelado"),
            allowNull: false,
        },
        loanId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clientId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };
}
