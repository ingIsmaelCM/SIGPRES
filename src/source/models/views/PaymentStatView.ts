import {DataTypes, InitOptions, Model, ModelAttributeColumnOptions, Sequelize} from "sequelize";
import {IPaymentRelation, IPaymentStatView} from "@app/interfaces/SourceInterfaces";
import ITM from "@app/models/ITenantModel";
import {Client, Loan} from "@source/models";


@ITM.staticImplements<IPaymentStatView, IPaymentRelation>()
export default class PaymentStatView extends Model implements IPaymentStatView {
    declare loanCode: string;
    declare averageAbonoCapital: number;
    declare averageDiffInDay: number;
    declare clientId: string;
    declare finalMora: number;
    declare initialMora: number;
    declare loanId: string;
    declare modaWallet: string;
    declare mora: number;
    declare onTime: number;
    declare percentOnTime: number;
    declare outTime: number;
    declare percentOutTime: number;
    declare totalAbonoCapital: number;
    declare totalAmount: number;
    declare totalCapital: number;
    declare totalCapitalOnCuota: number;
    declare totalInterest: number;
    declare totalUtility: number;
    declare percentUtility: number;
    declare loanAmount: number;
    declare loanBalance: number;
    declare loanPayedPercent: number;

    static tableName = "paymentStatview";
    static modelName = "PaymentStatView";
    static additionalOptions: Partial<InitOptions> = {
        paranoid: false,
        timestamps: false
    };

    static getSearchables(): Array<keyof IPaymentStatView> {
        return ["clientId", "loanId", "onTime", "averageAbonoCapital", "averageDiffInDay",
            "finalMora", "initialMora", "loanAmount", "loanBalance", "loanCode", "modaWallet",
            "mora", "outTime", "totalAbonoCapital", "totalAmount", "totalCapital",
            "totalCapitalOnCuota", "totalInterest"]
    }

    static getRelations(): Array<keyof IPaymentRelation> {
        return []
    }

    static attributes: Record<keyof IPaymentStatView, ModelAttributeColumnOptions> = {
        loanCode: {
            type: DataTypes.STRING
        },
        averageAbonoCapital: {
            type: DataTypes.DECIMAL
        },
        averageDiffInDay: {
            type: DataTypes.DECIMAL
        },
        clientId: {
            type: DataTypes.STRING
        },
        finalMora: {
            type: DataTypes.DECIMAL
        },
        initialMora: {
            type: DataTypes.DECIMAL
        },
        loanId: {
            type: DataTypes.STRING
        },
        modaWallet: {
            type: DataTypes.STRING
        },
        mora: {
            type: DataTypes.DECIMAL
        },
        onTime: {
            type: DataTypes.DECIMAL,
            get(this: PaymentStatView) {
                if (this.getDataValue('outTime') === 0) {
                    return 1;
                }
                return this.getDataValue('onTime');
            }
        },
        outTime: {
            type: DataTypes.DECIMAL
        },
        percentOnTime: {
            type: DataTypes.VIRTUAL,
            get(this: PaymentStatView) {
                if (this.getDataValue('outTime') === 0) {
                    return 100;
                }
                const percent = Number(this.getDataValue("onTime") || 0.01) /
                    ((this.getDataValue("onTime")) + this.getDataValue("outTime"));
                return Number((percent * 100).toFixed(2))
            }
        },
        percentOutTime: {
            type: DataTypes.VIRTUAL,
            get(this: PaymentStatView) {
                const percent = Number(this.getDataValue("outTime")) || 0.01 /
                    (this.getDataValue("onTime") + this.getDataValue("outTime"));
                return Number((percent * 100).toFixed(2))
            }
        },
        totalAbonoCapital: {
            type: DataTypes.DECIMAL
        },
        totalAmount: {
            type: DataTypes.DECIMAL
        },
        totalCapital: {
            type: DataTypes.DECIMAL
        },
        totalCapitalOnCuota: {
            type: DataTypes.DECIMAL
        },
        totalInterest: {
            type: DataTypes.DECIMAL
        },
        totalUtility: {
            type: DataTypes.VIRTUAL,
            get(this: PaymentStatView) {
                const utility = Number(this.getDataValue("totalAmount")) -
                    (this.getDataValue("totalCapital"));
                return Number(utility.toFixed(2))
            }
        },
        percentUtility: {
            type: DataTypes.VIRTUAL,
            get(this: PaymentStatView) {
                const utility = Number(this.getDataValue("totalAmount")) -
                    (this.getDataValue("totalCapital"));
                const percent = utility / Number(this.getDataValue("totalCapital"))
                return Number((percent * 100).toFixed(2))
            }
        },
        loanAmount: {
            type: DataTypes.DECIMAL
        },
        loanBalance: {
            type: DataTypes.DECIMAL
        },
        loanPayedPercent: {
            type: DataTypes.VIRTUAL,
            get(this: PaymentStatView) {
                const percent = Number(this.getDataValue("totalCapital")) /
                    Number(this.getDataValue("loanAmount"))
                return Number((percent * 100).toFixed(2))
            }
        }
    }

    static initRelation(sequelize: Sequelize) {
        sequelize.model("PaymentStatView")
            .belongsTo(sequelize.model("Client"), {
                foreignKey: "clientId",
                as: "client"
            })
        sequelize.model("PaymentStatView")
            .belongsTo(sequelize.model("Loan"), {
                foreignKey: "loanId",
                as: "loan"
            })
    }


}