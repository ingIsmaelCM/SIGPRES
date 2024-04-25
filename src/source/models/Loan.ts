import ITM from "@/app/models/ITenantModel";
import {DataTypes, Model, ModelAttributeColumnOptions, Sequelize} from "sequelize";
import {
    ELoanPeriod,
    ELoanStatus, ELoanType,
    ILoan,
    ILoanRelation,
} from "@app/interfaces/SourceInterfaces";
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
    declare createdBy?: string;
    declare updatedBy?: string;
    declare createdAt?: string;
    declare updatedAt?: string;
    declare deletedAt?: string;

    static tableName = "loans";
    static modelName = "Loan";
    static additionalOptions = {}

    static getSearchables(): Array<keyof ILoan> {
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

    static getRelations(): Array<keyof ILoanRelation> {
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
            get(this: Loan) {
                return Number(this.getDataValue("amount"))
            }
        },
        balance: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: Loan) {
                return Number(this.getDataValue("balance"))
            }
        },
        term: {
            type: DataTypes.INTEGER,
            allowNull: false,
            get(this: Loan) {
                return Number(this.getDataValue("term"))
            }
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
        type: {
            type: DataTypes.ENUM(...Object.values(ELoanType)),
            allowNull: false,
            defaultValue: ELoanType.Fixed
        },
        clientId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lawyerId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        walletId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        guarantorId: {
            type: DataTypes.STRING,
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


    static initRelations(sequelize: Sequelize) {
        sequelize.model("Loan")
            .belongsTo(sequelize.model("LawyerView"), {
                as: "lawyer",
                foreignKey: 'lawyerId',
            })

        sequelize.model("Loan")
            .belongsTo(sequelize.model("ContactView"), {
                as: 'guarantor',
                foreignKey: 'guarantorId'
            })

        sequelize.model("Loan")
            .belongsTo(sequelize.model("ClientView"), {
                as: 'client',
                foreignKey: 'clientId'
            })

        sequelize.model("Loan")
            .hasOne(sequelize.model("Condition"), {
                as: 'condition',
                foreignKey: 'loanId'
            })

        sequelize.model("Loan")
            .hasMany(sequelize.model("Image"), {
                as: 'images',
                foreignKey: 'imageableId',
                scope: {
                    imageableType: EImageable.Loan
                }
            })
        sequelize.model("Loan")
            .hasMany(sequelize.model("Document"), {
                as: 'documents',
                foreignKey: 'documentableId',
                scope: {
                    documentableType: EDocumentable.Loan
                }
            })

        sequelize.model("Loan")
            .hasMany(sequelize.model("Payment"), {
                as: 'payments',
                foreignKey: 'loanId',
            })

        sequelize.model("Loan")
            .hasMany(sequelize.model("Mora"), {
                as: 'moras',
                foreignKey: 'loanId',
            })

        sequelize.model("Loan")
            .hasMany(sequelize.model("Amortization"), {
                as: 'amortizations',
                foreignKey: 'loanId',
            })
    }
}

