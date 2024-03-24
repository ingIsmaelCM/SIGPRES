import {
    ClientContact,
    ClientContactView,
    ClientView,
    ContactView,
    Document,
    Job,
    Loan,
    Mora,
    Payment,
    Social
} from "@source/models/index";
import Image from "@source/models/Image";
import {EDocumentable, EImageable} from "@app/interfaces/FileInterface";

/* TODO: Define relations for each Source Models */
export default class SourceRelation {
    static initRelation() {
        ContactView.belongsToMany(ClientView, {
            through: ClientContact,
            as: "clients",
            foreignKey: "contactId",
            otherKey: "clientId",
            targetKey: "id"
        })

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

        ClientContact.belongsTo(ClientView, {
            foreignKey: "clientId",
            as: "client",
        })
        ClientContact.belongsTo(ContactView, {
            foreignKey: "contactId",
            as: "contact",
        })

        ContactView.hasOne(Image, {
            foreignKey: "imageableId",
            scope: {
                imageableType: EImageable.Contact,
                caption: "Perfil Contacto"
            },
            as: "profile"
        })

        ClientContactView.hasOne(Image, {
            foreignKey: "imageableId",
            sourceKey: "contactId",
            scope: {
                imageableType: EImageable.Contact,
                caption: "Perfil Contacto"
            },
            as: "profile"
        })
    }
} /* 
      "documents",
      "moras",
      "amortizations", */
