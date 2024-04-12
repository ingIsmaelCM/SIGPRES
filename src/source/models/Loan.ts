import ITM from "@/app/models/ITenantModel";
import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import {
    ELoanPeriod,
    ELoanStatus, ELoanType,
    ILoan,
    ILoanRelation,
} from "@app/interfaces/SourceInterfaces";
import {
    Amortization,
    ClientView,
    Condition,
    ContactView,
    Document,
    Image,
    LawyerView,
    Mora,
    Payment
} from "@source/models/index";
import {EDocumentable, EImageable} from "@app/interfaces/FileInterface";

@ITM.staticImplements<ILoan, ILoanRelation>()
export default class Loan extends Model implements ILoan {
    declare code: string;
    declare amount: number;
    declare balance: number;
    declare startAt: string;
    declare endAt: string;
    declare nextPaymentAt: string;
    declare term: number;
    declare status: ELoanStatus;
    declare period: ELoanPeriod | number;
    declare type: ELoanType;
    declare clientId: string;
    declare lawyerId: string;
    declare walletId: string;
    declare guarantorId: string;
    declare id?: string;
    declare createdBy?: number;
    declare updatedBy?: number;
    declare createdAt?: string;
    declare updatedAt?: string;
    declare deletedAt?: string;

    static tableName = "loans";
    static modelName = "Loan";
    static additionalOptions = {}

    getSearchables(): Array<keyof ILoan> {
        return [
            "code",
            "clientId",
            "walletId",
            "lawyerId",
            "amount",
            "balance",
            "startAt",
            "endAt",
            "period",
            "term",
            "status",
            "type",
            "guarantorId",
        ];
    }

    getRelations(): Array<keyof ILoanRelation> {
        return [
            "lawyer",
            "guarantor",
            "client",
            "condition",
            "images",
            "documents",
            "payments",
            "moras",
            "amortizations",
        ];
    }

    static attributes: Record<keyof ILoan, ModelAttributeColumnOptions> = {
        ...ITM.commonAttributes,
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        balance: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        term: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM(...Object.values(ELoanStatus)),
            allowNull: false,
            defaultValue: ELoanStatus.Pendiente,
        },
        period: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type:{
          type: DataTypes.ENUM(...Object.values(ELoanType)),
          allowNull: false,
          defaultValue: ELoanType.Fixed
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lawyerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        walletId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        guarantorId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        startAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        nextPaymentAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    };


    static initRelations() {
        Loan.belongsTo(LawyerView, {
            as: "lawyer",
            foreignKey: 'lawyerId',
        })

        Loan.belongsTo(ContactView, {
            as: 'guarantor',
            foreignKey: 'guarantorId'
        })

        Loan.belongsTo(ClientView, {
            as: 'client',
            foreignKey: 'clientId'
        })

        Loan.hasOne(Condition, {
            as: 'condition',
            foreignKey: 'loanId'
        })

        Loan.hasMany(Image, {
            as: 'images',
            foreignKey: 'imageableId',
            scope: {
                imageableType: EImageable.Loan
            }
        })
        Loan.hasMany(Document, {
            as: 'documents',
            foreignKey: 'documentableId',
            scope: {
                documentableType: EDocumentable.Loan
            }
        })

        Loan.hasMany(Payment, {
            as: 'payments',
            foreignKey: 'loanId',
        })

        Loan.hasMany(Mora, {
            as: 'moras',
            foreignKey: 'loanId',
        })

        Loan.hasMany(Amortization, {
            as: 'amortizations',
            foreignKey: 'loanId',
        })
    }
}

