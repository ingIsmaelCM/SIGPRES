import ITM from "@/app/models/ITenantModel";
import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import {EJobStatus, IJob, IJobRelation} from "../utils/SourceInterfaces";

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
    declare id?: number;
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
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        infoId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ...ITM.commonAttributes,
    };
}
