import {DataTypes, Model} from "sequelize";
import ITM from "@app/models/ITenantModel";
import {IJobRelation, IJobView} from "@app/interfaces/SourceInterfaces";
import {Info, Job} from "@source/models";
import moment from "moment";


@ITM.staticImplements<IJobView, IJobRelation>()
export default class JobView extends Model {
    static tableName = "jobview";
    static modelName = "JobView";
    static additionalOptions = {}
    static attributes = {
        ...Job.attributes,
        ...Info.attributes,

    };

   static  getSearchables(): Array<keyof IJobView> {
        return ["status", "clientId", "position", "company", "endAt", "startAt",
            "email", "dni", "gender", "country", "infoId", "birthdate"]
    }

   static getRelations(): Array<keyof IJobRelation> {
        return ["client","image","document"]
    }

}