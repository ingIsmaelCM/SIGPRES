import {Model} from "sequelize";
import ITM from "@app/models/ITenantModel";
import {ILawyerRelation, ILawyerView} from "@app/interfaces/SourceInterfaces";
import {Info, Lawyer} from "@source/models";


@ITM.staticImplements<ILawyerView, ILawyerRelation>()
export default class LawyerView extends Model {
    static tableName = "LawyerView";
    static modelName = "LawyerView";
    static additionalOptions = {}
    static attributes = {
        ...Lawyer.attributes,
        ...Info.attributes
    };

    getSearchables(): Array<keyof ILawyerView> {
        return ["name", "lastname", "exequatur",
            "email", "dni", "gender", "country", "infoId", "birthdate"]
    }

    getRelations(): Array<keyof ILawyerRelation> {
        return ["expenses", "loans", "payments","image","document"]
    }

}