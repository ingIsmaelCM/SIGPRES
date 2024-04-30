import {DataTypes, Model, ModelAttributeColumnOptions, Sequelize} from "sequelize";
import {ELoanPeriod, ELoanStatus, ELoanType, ILoanRelation, ILoanView} from "@app/interfaces/SourceInterfaces";
import ITM from "@app/models/ITenantModel";
import {Condition, Loan} from "@source/models";

@ITM.staticImplements<ILoanView, ILoanRelation>()
export default class LoanView extends Model implements ILoanView {
    declare amount: number;
    declare balance: number;
    declare clientId: string;
    declare clientName: string;
    declare code: string;
    declare endAt: string;
    declare finalRateMora: number;
    declare grace: number;
    declare guarantorId: string;
    declare initRateMora: number;
    declare initTerm: number;
    declare lawyerId: string;
    declare loanId: string;
    declare nextPaymentAt: string;
    declare period: ELoanPeriod | number;
    declare rate: number;
    declare startAt: string;
    declare status: ELoanStatus;
    declare term: number;
    declare type: ELoanType;
    declare walletId: string;

    static tableName = "loanview";
    static modelName = "LoanView";
    static additionalOptions = {};
    static attributes: Record<keyof ILoanView, ModelAttributeColumnOptions> = {
        ...Loan.attributes,
        initTerm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            get(this: Condition) {
                return Number(this.getDataValue("initTerm"));
            }
        },
        initRateMora: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: Condition) {
                return Number(this.getDataValue("initRateMora"));
            }
        },
        grace: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            get(this: Condition) {
                return Number(this.getDataValue("grace"));
            }
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
            get(this: Condition) {
                return Number(this.getDataValue("rate"));
            }
        },
        finalRateMora: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: Condition) {
                return Number(this.getDataValue("finalRateMora"));
            }
        },
        clientName: {
            type: DataTypes.STRING(100)
        }
    }

    static getSearchables(): Array<keyof ILoanView> {
        return [
            ...Loan.getSearchables(),
            "initTerm", "initRateMora", "finalRateMora",
            "clientName","grace","rate",
        ]
    }

    static getRelations(): Array<keyof ILoanRelation> {
        return Loan.getRelations()
    }

    static initRelation(sequelize: Sequelize) {
        Loan.initRelations(sequelize, "LoanView");
    }

}