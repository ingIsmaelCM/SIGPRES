import {Model} from "sequelize";
import ITM from "@app/models/ITenantModel";
import {IClientRelation, IClientView} from "@app/interfaces/SourceInterfaces";
import {Client, ClientContact, ContactView, Document, Info, Job, Loan, Mora, Payment, Social} from "@source/models";
import Image from "../Image";
import {EDocumentable, EImageable} from "@app/interfaces/FileInterface";


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
        return ["contacts", "profile", "images", "loans", "payments", "documents",
            "jobs", "moras", "social"]
    }

    static initRelation(){
        ClientView.belongsToMany(ContactView, {
            through: ClientContact,
            as: "contacts",
            foreignKey: "clientId",
            otherKey: "contactId",
            targetKey: "id"
        });

        ClientView.hasOne(Image, {
            foreignKey: "imageableId",
            scope: {
                imageableType: EImageable.Client,
                caption: "Perfil Cliente"
            },
            as: "profile"
        })
        ClientView.hasMany(Image, {
            foreignKey: "imageableId",
            scope: {
                imageableType: EImageable.Client,
            },
            as: "images"
        })

        ClientView.hasMany(Document, {
            foreignKey: "documentableId",
            scope: {
                imageableType: EDocumentable.Client,
            },
            as: "documents"
        })

        ClientView.hasMany(Loan, {
            foreignKey: "clientId",
            as: "loans"
        })
        ClientView.hasMany(Payment, {
            foreignKey: "clientId",
            as: "payments"
        })

        ClientView.hasMany(Mora, {
            foreignKey: "clientId",
            as: "moras"
        })

        ClientView.hasMany(Job, {
            foreignKey: "clientId",
            as: "jobs"
        })

        ClientView.hasOne(Social, {
            foreignKey: "clientId",
            as: "social"
        })

    }
}