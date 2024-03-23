import {ClientContact, ClientView, ContactView} from "@source/models/index";
import Image from "@source/models/Image";
import {EImageable} from "@app/interfaces/FileInterface";

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

        ClientView.hasOne(Image,{
            foreignKey: "imageableId",
            scope:{
                imageableType: EImageable.Client,
                caption: "Perfil Cliente"
            },
            as: "profile"
        })
        ClientContact.belongsTo(ClientView,{
            foreignKey: "clientId",
            as: "client",
        })
        ClientContact.belongsTo(ContactView,{
            foreignKey: "contactId",
            as: "contact",
        })
    }
} /* 
      "documents",
      "moras",
      "amortizations", */
