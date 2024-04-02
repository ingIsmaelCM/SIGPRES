import {DataTypes, Model, ModelAttributeColumnOptions} from "sequelize";
import {EInfoGender, IUserView, IUserViewRelation} from "@app/interfaces/SourceInterfaces";
import ITM from "@app/models/ITenantModel";


@ITM.staticImplements<IUserView, IUserViewRelation>()
export default class UserView extends Model implements IUserView {
    declare address: string;
    declare birthdate: string;
    declare country: string;
    declare dni: string;
    declare email?: string;
    declare gender: EInfoGender;
    declare Id: string;
    declare infoId: string;
    declare lastlogin: string;
    declare lastname: string;
    declare name: string;
    declare phone: string;
    declare sessionId: string;
    declare username: string;
    declare password: string;
    static tableName = "userview";
    static modelName = "UserView";
    static additionalOptions = {}

    static attributes: Record<keyof Partial<IUserView>, ModelAttributeColumnOptions> = {
        address: {
            type: DataTypes.STRING
        },
        birthdate: {
            type: DataTypes.DATE
        },
        country: {
            type: DataTypes.STRING
        },
        dni: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        infoId: {
            type: DataTypes.INTEGER
        },
        lastlogin: {
            type: DataTypes.DATE
        },
        lastname: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL,
            get(this: UserView) {
                return null;
            }
        },
        sessionId: {
            type: DataTypes.VIRTUAL,
            get(this: UserView) {
                return null;
            }
        },

        ...ITM.commonAttributes,

    }

    getSearchables(): Array<keyof IUserView> {
        return []
    }

    getRelations(): Array<keyof IUserViewRelation> {
        return []
    }


}