import {DataTypes, Model, Sequelize} from "sequelize";
import {IPayment, IPaymentRelation} from "@app/interfaces/SourceInterfaces";
import ITM from "@/app/models/ITenantModel";
import {Wallet, Mora, Loan, Client} from "@source/models/index";

@ITM.staticImplements<IPayment, IPaymentRelation>()
export default class Payment extends Model implements IPayment {
    declare amount: number;
    declare capital: number;
    declare interest: number;
    declare balanceBefore: number;
    declare balanceAfter: number;
    declare dueAt: string;
    declare payedAt: string;
    declare note?: string;
    declare walletId: string;
    declare loanId: string;
    declare clientId: string;
    declare lawyerId?: string;
    declare id?: string;
    declare createdBy?: number;
    declare updatedBy?: number;
    declare createdAt?: string;
    declare updatedAt?: string;
    declare deletedAt?: string;

    static getSearchables(): (keyof IPayment)[] {
        return [
            "amount",
            "capital",
            "interest",
            "balanceBefore",
            "balanceAfter",
            "dueAt",
            "payedAt",
            "note",
            "walletId",
            "loanId",
            "clientId",
            "lawyerId",
        ];
    }

    static getRelations(): (keyof IPaymentRelation)[] {
        return ["wallet", "loan", "lawyer", "client", "mora", "images", "loan.client", "loan.condition", "loan.wallet"];
    }

    static tableName = "payments";
    static modelName = "Payment";
    static additionalOptions = {}
    static attributes: Record<keyof IPayment, any> = {
        ...ITM.commonAttributes,
        amount: {
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
        balanceBefore: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        balanceAfter: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        dueAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        payedAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,

        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        walletId: {
            type: DataTypes.INTEGER,
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
        lawyerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    };

    static initRelation(sequelize: Sequelize) {

        sequelize.model("Payment")
            .hasOne(sequelize.model("Mora"), {
                foreignKey: "paymentId",
                as: "mora"
            })

        sequelize.model("Payment")
            .belongsTo(sequelize.model("Wallet"), {
                foreignKey: "walletId",
                as: "wallet"
            })

        sequelize.model("Payment")
            .belongsTo(sequelize.model("Loan"), {
                foreignKey: "loanId",
                as: "loan"
            })

        sequelize.model("Payment")
            .belongsTo(sequelize.model("Client"), {
                foreignKey: "clientId",
                as: "client"
            })
    }
}
