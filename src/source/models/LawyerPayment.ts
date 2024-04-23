import {DataTypes, Model, ModelAttributeColumnOptions, Sequelize} from "sequelize";
import {ELawyerPaymentStatus, ILawyerPayment, ILawyerPaymentRelation} from "@app/interfaces/SourceInterfaces";
import ITM from "@app/models/ITenantModel";
import {LawyerView, Loan, Payment, Wallet} from "@source/models/index";


@ITM.staticImplements<ILawyerPayment, ILawyerPaymentRelation>()
export default class LawyerPayment extends Model implements ILawyerPayment {
    declare amount: number;
    declare date: string;
    declare closedAt: string;
    declare id: string;
    declare lawyerId: string;
    declare loanId: string;
    declare payPrice: number;
    declare paymentId: string;
    declare status: ELawyerPaymentStatus;
    declare walletId: string;

    static tableName = "lawyer_payments";
    static modelName = "LawyerPayment";
    static additionalOptions = {}
    static attributes: Record<keyof ILawyerPayment, ModelAttributeColumnOptions> = {
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: LawyerPayment) {
                return Number(this.getDataValue("amount"))
            }
        },
        payPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: LawyerPayment) {
                return Number(this.getDataValue("payPrice"))
            }
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        closedAt: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        lawyerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        loanId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paymentId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        walletId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM(...Object.values(ELawyerPaymentStatus)),
            allowNull: false
        },
        ...ITM.commonAttributes
    }

    static getSearchables(): Array<keyof ILawyerPayment> {
        return ["loanId", "lawyerId", "paymentId", "amount", "closedAt", "payPrice", "status", "walletId"]
    }

    static getRelations(): Array<keyof ILawyerPaymentRelation> {
        return ["lawyer", "payment", "loan", "wallet"]
    }

    static initRelation(sequelize: Sequelize) {
        sequelize.model("LawyerPayment")
            .belongsTo(sequelize.model("LawyerView"), {
                foreignKey: "lawyerId",
                as: "lawyer"
            })
        sequelize.model("LawyerPayment")
            .belongsTo(sequelize.model("Loan"), {
                foreignKey: "loanId",
                as: "loan"
            })
        sequelize.model("LawyerPayment")
            .belongsTo(sequelize.model("Payment"), {
                foreignKey: "paymentId",
                as: "payment"
            })
        sequelize.model("LawyerPayment")
            .belongsTo(sequelize.model("Wallet"), {
                foreignKey: "walletId",
                as: "wallet"
            })
    }


}