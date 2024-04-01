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
    declare loanId: number;
    declare clientId: number;
    declare id: number;

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
        mora: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0
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
