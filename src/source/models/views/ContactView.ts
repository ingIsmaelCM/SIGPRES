import {Model} from "sequelize";
import ITM from "@app/models/ITenantModel";
import {IContactRelation, IContactView} from "@app/interfaces/SourceInterfaces";
import {Contact, Info} from "@source/models";


@ITM.staticImplements<IContactView, IContactRelation>()
export default class ContactView extends Model {
    static tableName = "contactView";
    static modelName = "ContactView";
    static additionalOptions = {}
    static attributes = {
        ...Contact.attributes,
        ...Info.attributes
    };

    getSearchables(): Array<keyof IContactView> {
        return ["name", "lastname", "email", "dni", "gender", "country", "infoId", "birthdate"]
    }

    getRelations(): Array<keyof  IContactRelation> {
        return ["clients", "profile"]
    }

}