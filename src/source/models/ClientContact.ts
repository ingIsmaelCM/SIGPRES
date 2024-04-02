import {DataTypes, Model} from "sequelize";
import Client from "@source/models/Client";
import Contact from "@source/models/Contact";
import ITM from "@app/models/ITenantModel";
import IClientContactRelation, {EClientContactRelationship, IClientContact} from "@app/interfaces/SourceInterfaces";
import {ClientView, ContactView} from "@source/models/index";

@ITM.staticImplements<IClientContact, IClientContactRelation>()
export default class ClientContact extends Model implements IClientContact {

    static tableName = "client_contacts";
    static modelName = "ClientContact";
    static attributes = {
        clientId: {
            type: DataTypes.INTEGER,
            references: {
                model: Client,
                key: "id"
            }
        },
        contactId: {
            type: DataTypes.INTEGER,
            references: {
                model: Contact,
                key: "id"
            }
        },
        relationship: {
            type: DataTypes.ENUM(...Object.values(EClientContactRelationship)),
            allowNull: false,
            defaultValue: EClientContactRelationship.Otro
        },
        isGarante: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        ...ITM.commonAttributes
    };

    static additionalOptions = {}
    declare clientId: string;
    declare contactId: string;
    declare relationship: EClientContactRelationship;
    declare isGarante: 0 | 1;

    getSearchables(): Array<keyof IClientContact> {
        return ["clientId","contactId","isGarante","relationship"]
    }

    getRelations(): Array<keyof IClientContactRelation> {
        return ["client", "contact"]
    }
    static initRelation(){
        ClientContact.belongsTo(ClientView, {
            foreignKey: "clientId",
            as: "client",
        })
        ClientContact.belongsTo(ContactView, {
            foreignKey: "contactId",
            as: "contact",
        })
    }

}

