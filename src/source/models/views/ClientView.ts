import {Model} from "sequelize";
import ITM from "@app/models/ITenantModel";
import {IClientRelation, IClientView} from "@app/interfaces/SourceInterfaces";
import {Client, Info} from "@source/models";


@ITM.staticImplements<IClientView, IClientRelation>()
export default class ClientView extends Model {
    static tableName = "clientView";
    static modelName = "ClientView";
    static additionalOptions = {}
    static attributes = {
        ...Client.attributes,
        ...Info.attributes
    };

    getSearchables(): Array<keyof IClientView> {
        return ["name", "lastname", "email", "dni", "gender", "country", "code",
            "clienttype", "birthdate", "infoId", "address"]
    }

    getRelations(): Array<keyof IClientRelation> {
        return ["contacts", "profile"]
    }

}