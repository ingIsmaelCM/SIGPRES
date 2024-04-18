import {Model, Sequelize} from "sequelize";
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

    static getSearchables(): Array<keyof IContactView> {
        return ["name", "lastname", "email", "dni", "gender", "country", "infoId", "birthdate"]
    }

    static getRelations(): Array<keyof IContactRelation> {
        return ["clients", "profile"]
    }

    static initRelation(sequelize: Sequelize) {
        sequelize.model("ContactView")
            .belongsToMany(sequelize.model("ClientView"), {
                through: sequelize.model("ClientContact"),
                as: "clients",
                foreignKey: "contactId",
                otherKey: "clientId",
                targetKey: "id"
            })
        sequelize.model("ContactView")
            .hasOne(sequelize.model("Image"), {
                foreignKey: "imageableId",
                scope: {
                    imageableType: EImageable.Contact,
                    caption: "Perfil Contacto"
                },
                as: "profile"
            })
    }
}