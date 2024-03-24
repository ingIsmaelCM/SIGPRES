import {DataTypes, InitOptions, Model, ModelAttributeColumnOptions} from "sequelize";
import {
    EClientContactRelationship,
    EInfoGender,
    IClientContactView,
    IContactRelation
} from "@app/interfaces/SourceInterfaces";
import ITM from "@app/models/ITenantModel";
import {ClientContact, ContactView} from "@source/models";

@ITM.staticImplements<IClientContactView, IContactRelation>()
export default class ClientContactView extends Model implements IClientContactView {
    static tableName = "clientContactView";
    static modelName = "ClientContactView"
    static attributes: Record<keyof IClientContactView, ModelAttributeColumnOptions> = {
        ...ClientContact.attributes,
        ...ContactView.attributes,
        relationId:{
            type: DataTypes.INTEGER
        }
    }
    static additionalOptions: Partial<InitOptions>={

    }
    declare clientId: number;
    declare contactId: number;
    declare relationId: number;
    declare country: string;
    declare dni: string;
    declare fullname: string;
    declare gender: EInfoGender;
    declare infoId: number;
    declare isGarante: 0 | 1;
    declare lastname: string;
    declare name: string;
    declare phone: string;
    declare relationship: EClientContactRelationship;

    getSearchables(): Array<keyof IClientContactView> {
        return ["contactId", "clientId", "relationship", "lastname", "name", "address", "email", "phone", "isGarante"]
    }

    getRelations(): Array<keyof IContactRelation|"profile"> {
        return ["clients", "profile"]
    }

}