import {Model, ModelAttributeColumnOptions, Sequelize} from "sequelize";
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

    static attributes: Record<keyof IClientView, ModelAttributeColumnOptions> = {
        ...Client.attributes,
        ...Info.attributes
    };

    static getSearchables(): Array<keyof IClientView> {
        return ["name", "lastname", "email", "dni", "gender", "country", "code",
            "clienttype", "birthdate", "infoId", "address"]
    }

    static getRelations(): Array<keyof IClientRelation> {
        return ["contacts", "profile", "images", "loans", "payments", "documents",
            "jobs", "moras", "social"]
    }

    static initRelation(sequelize: Sequelize) {
        sequelize.model("ClientView")
            .belongsToMany(sequelize.model("ContactView"), {
                through:  sequelize.model("ClientContact"),
                as: "contacts",
                foreignKey: "clientId",
                otherKey: "contactId",
                targetKey: "id"
            });

        sequelize.model("ClientView")
            .hasOne(sequelize.model("Image"), {
                foreignKey: "imageableId",
                scope: {
                    imageableType: EImageable.Client,
                    caption: "Perfil Cliente"
                },
                as: "profile"
            })
        sequelize.model("ClientView")
            .hasMany(sequelize.model("Image"), {
                foreignKey: "imageableId",
                scope: {
                    imageableType: EImageable.Client,
                },
                as: "images"
            })

        sequelize.model("ClientView")
            .hasMany(sequelize.model("Document"), {
                foreignKey: "documentableId",
                scope: {
                    imageableType: EDocumentable.Client,
                },
                as: "documents"
            })

        sequelize.model("ClientView")
            .hasMany(sequelize.model("Loan"), {
                foreignKey: "clientId",
                as: "loans"
            })
        sequelize.model("ClientView")
            .hasMany(sequelize.model("Payment"), {
                foreignKey: "clientId",
                as: "payments"
            })

        sequelize.model("ClientView")
            .hasMany(sequelize.model("Mora"), {
                foreignKey: "clientId",
                as: "moras"
            })

        sequelize.model("ClientView")
            .hasMany(sequelize.model("Job"), {
                foreignKey: "clientId",
                as: "jobs"
            })

        sequelize.model("ClientView")
            .hasOne(sequelize.model("Social"), {
                foreignKey: "clientId",
                as: "social"
            })

    }
}