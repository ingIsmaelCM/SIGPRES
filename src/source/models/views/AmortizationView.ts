import {DataTypes, Model, Sequelize} from "sequelize";
import ITM from "@app/models/ITenantModel";
import {EAmortizationStatus, IAmortizationRelation, IAmortizationView} from "@app/interfaces/SourceInterfaces";
import {Amortization, ClientView, Condition, Loan} from "@source/models";
import moment from "moment";
import amortization from "@app/utils/amortization";


@ITM.staticImplements<IAmortizationView, IAmortizationRelation>()
export default class AmortizationView extends Model implements IAmortizationView {
    declare isExpired: boolean;
    declare expiresAt: string;
    declare initMora: number;
    declare finalMora: number;
    declare date: string;
    declare nro: number;
    declare cuota: number;
    declare capital: number;
    declare interest: number;
    declare balance: number;
    declare status: EAmortizationStatus;
    declare loanId: string;
    declare clientId: string;
    declare initTerm: number;
    declare initRateMora: number;
    declare finalRateMora: number;
    declare grace: number;
    declare rate: number;
    declare mora: number;
    static tableName = "amortizationview";
    static modelName = "AmortizationView";
    static additionalOptions = {}
    static attributes = {
        ...Amortization.attributes,
        ...Condition.attributes,
        expiresAt: {
            type: DataTypes.DATE
        },
        cuota: {
            type: DataTypes.DECIMAL,
            get(this: AmortizationView) {
                const cuota = Number(this.getDataValue("cuota")) + Number(this.mora)
                return Number(cuota.toFixed(2))
            }
        },
        mora: {
            type: DataTypes.VIRTUAL,
            get(this: AmortizationView) {
                const {mora} = this.getDataValue("mora") || amortization.getMora(this);
                return mora;
            }
        },
        initMora: {
            type: DataTypes.VIRTUAL,
            get(this: AmortizationView) {
                const {initMora} = amortization.getMora(this);
                return initMora;
            }
        },
        finalMora: {
            type: DataTypes.VIRTUAL,
            get(this: AmortizationView) {
                const {finalMora} = amortization.getMora(this);
                return finalMora;
            }
        },
        isExpired: {
            type: DataTypes.VIRTUAL,
            get(this: AmortizationView) {
                return moment().subtract(25, 'hours').isAfter(moment(this.getDataValue("expiresAt")));
            }
        }

    };

    static getSearchables(): Array<any> {
        return [
            ...Amortization.getSearchables(),
            "expiresAt",
            'date'
        ]
    }

    static getRelations(): Array<keyof IAmortizationRelation> {
        return Amortization.getRelations()
    }

    static initRelation(sequelize: Sequelize) {
        sequelize.model("AmortizationView")
            .belongsTo(sequelize.model("Loan"), {
                foreignKey: "loanId",
                as: "loan"
            })
        sequelize.model("AmortizationView")
            .belongsTo(sequelize.model("ClientView"), {
                foreignKey: "clientId",
                as: "client"
            })
    }
}