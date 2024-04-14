import ITM from "@/app/models/ITenantModel";
import {DataTypes, Model} from "sequelize";
import {ICondition, IConditionRelation} from "@app/interfaces/SourceInterfaces";

@ITM.staticImplements<ICondition, IConditionRelation>()
export default class Condition extends Model implements ICondition {
    declare initTerm: number;
    declare initRateMora: number;
    declare finalRateMora: number;
    declare loanId: string;
    declare clientId: string;
    declare grace: number;
    declare rate: number;
    declare id?: string;
    declare createdBy?: number;
    declare updatedBy?: number;
    declare createdAt?: string;
    declare updatedAt?: string;
    declare deletedAt?: string;

    getSearchables(): Array<keyof ICondition> {
        return ["initTerm", "initRateMora", "finalRateMora", "loanId", "clientId"];
    }

    getRelations(): (keyof IConditionRelation)[] {
        return ["loan", "client"];
    }

    static additionalOptions = {}
    static tableName = "conditions";
    static modelName = "Condition";

    static attributes: Record<keyof ICondition, any> = {
        ...ITM.commonAttributes,

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
