import ITM from "@/app/models/ITenantModel";
import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import {EJobStatus, IJob, IJobRelation} from "@app/interfaces/SourceInterfaces";
import * as util from "util";
import tools from "@app/utils/tools";

@ITM.staticImplements<IJob, IJobRelation>()
export default class Job extends Model implements IJob {
    declare startAt: string;
    declare endAt?: string;
    declare status: EJobStatus;
    declare salary: number;
    declare position: string;
    declare company: string;
    declare infoId?: string;
    declare clientId: string;
    declare id?: string;
    declare createdBy?: number;
    declare updatedBy?: number;
    declare createdAt?: string;
    declare updatedAt?: string;
    declare deletedAt?: string;

    getSearchables(): Array<keyof IJob> {
        return ["startAt", "endAt", "status", "salary", "clientId", "company", "infoId", "position"];
    }

    getRelations(): Array<keyof IJobRelation> {
        return ["client", "info", "image", "document"];
    }

    static tableName = "jobs";
    static modelName = "Job";
    static additionalOptions={}
    static attributes: Record<keyof IJob, ModelAttributeColumnOptions> = {
        startAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM(...Object.values(EJobStatus)),
            allowNull: false,
            defaultValue: EJobStatus.Actual
        },
        salary: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            get(this: Job){
                return Number(this.getDataValue("salary"))
            }
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            set(this: Job, value: string){
                this.setDataValue("position", tools.initialToUpper(value))
            }
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
            set(this: Job, value: string){
                this.setDataValue("company", tools.initialToUpper(value))
            }
        },
        infoId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ...ITM.commonAttributes,
    };
}
