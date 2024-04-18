import {DataTypes, Model, ModelAttributeColumnOptions, Sequelize} from "sequelize";
import {EInfoGender, IUserView} from "@app/interfaces/SourceInterfaces";
import ITM from "@app/models/ITenantModel";
import {IAuthRelation} from "@app/interfaces/AuthInterfaces";
import ModelPermission from "@auth/models/ModelPermission";
import Auth from "@auth/models/Auth";
import Role from "@auth/models/Role";


@ITM.staticImplements<IUserView, IAuthRelation>()
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

   static  getSearchables(): Array<keyof IUserView> {
        return []
    }

   static getRelations(): Array<keyof IAuthRelation> {
        return ["permissions", "roles.permissions"]
    }

    static  initRelation(sequelize: Sequelize){
         sequelize.model("UserView")
             .belongsToMany(Auth.sequelize!.models.Permission,{
            as: "permissions",
            foreignKey: "modelId",
            through: {
                model: ModelPermission,
                scope: {
                    modelType: "auth",
                },
            },
            constraints: false,
        })

         sequelize.model("UserView")
             .belongsToMany(Role, {
            foreignKey: "roleId",
            through: "auth_roles",
            as: "roles",
        });
    }

}