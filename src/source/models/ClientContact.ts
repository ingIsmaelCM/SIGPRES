import {DataTypes, Model} from "sequelize";
import Client from "@source/models/Client";
import Contact from "@source/models/Contact";
import ITM from "@app/models/ITenantModel";


export default  class ClientContact extends  Model{

    static tableName="client_contacts";
    static modelName="ClientContact";

    getSearchables(){
        return []
    }

    getRelations(){
        return []
    }

    static attributes={
        clientId:{
            type: DataTypes.INTEGER,
            references:{
                model: Client,
                key: "id"
            }
        },
        contactId:{
            type: DataTypes.INTEGER,
            references:{
                model: Contact,
                key: "id"
            }
        },
        ...ITM.commonAttributes
    }
}