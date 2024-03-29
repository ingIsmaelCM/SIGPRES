import {Model} from "sequelize";
import ITM from "@app/models/ITenantModel";
import {IContactRelation, IContactView} from "@app/interfaces/SourceInterfaces";
import {ClientContact, ClientView, Contact, Info} from "@source/models";
import Image from "../Image";
import {EImageable} from "@app/interfaces/FileInterface";


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

    static initRelation(){
        ContactView.belongsToMany(ClientView, {
            through: ClientContact,
            as: "clients",
            foreignKey: "contactId",
            otherKey: "clientId",
            targetKey: "id"
        })
        ContactView.hasOne(Image, {
            foreignKey: "imageableId",
            scope: {
                imageableType: EImageable.Contact,
                caption: "Perfil Contacto"
            },
            as: "profile"
        })
    }
}