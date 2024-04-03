import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import {ELawyerPaymentStatus, ILawyerPayment, ILawyerPaymentRelation} from "@app/interfaces/SourceInterfaces";
import ITM from "@app/models/ITenantModel";
import { LawyerView, Loan, Payment, Wallet} from "@source/models/index";


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
            allowNull: false
        },
        payPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        closedAt: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lawyerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        loanId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        walletId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM(...Object.values(ELawyerPaymentStatus)),
            allowNull: false
        },
        ...ITM.commonAttributes
    }

    getSearchables(): Array<keyof ILawyerPayment> {
        return ["loanId", "lawyerId", "paymentId", "amount", "closedAt", "payPrice", "status", "walletId"]
    }

    getRelations(): Array<keyof ILawyerPaymentRelation> {
        return ["lawyer", "payment", "loan", "wallet"]
    }

    static initRelation() {
        LawyerPayment.belongsTo(LawyerView, {
            foreignKey: "lawyerId",
            as: "lawyer"
        })
        LawyerPayment.belongsTo(Loan, {
            foreignKey: "loanId",
            as: "loan"
        })
        LawyerPayment.belongsTo(Payment, {
            foreignKey: "paymentId",
            as: "payment"
        })
        LawyerPayment.belongsTo(Wallet, {
            foreignKey: "walletId",
            as: "wallet"
        })
    }


}