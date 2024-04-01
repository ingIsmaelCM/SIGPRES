import {DataTypes, InferAttributes, InferCreationAttributes, Model,} from "sequelize";
import {IModel} from "@app/models/IModel";
import BaseConnection from "@app/db/BaseConnection";

/*TODO: Create table, model and repository concerns.
   TODO: Set concernId on auths and modify register
 */

class Auth
    extends Model<InferAttributes<Auth>, InferCreationAttributes<Auth>>
    implements IModel {
    [x: string]: any;

    declare id: number;
    declare email: string;
    declare username: string;
    declare password: string;
    declare fullname: string;
    declare infoId: number;
    declare name: string;
    declare lastname: string;
    declare status: number;
    declare verifiedAt: string;
    declare createdAt: string;
    declare updatedAt: string;
    declare deletedAt: string;

    getSearchables() {
        return ["email", "username", "lastLogin", "verifiedAt", "status"];
    }

    /* istanbul ignore next */
    getRelations() {
        return [
            "roles",
            "roles.auths",
            "roles.permissions",
            "permissions",
            "tenants",
        ];
    }
}

Auth.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return undefined;
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.VIRTUAL,
            get(this:Auth){
                return `${this.getDataValue("name")} ${this.getDataValue("lastname")}`
            }
        },
        infoId: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        lastlogin: {
            type: DataTypes.DATE,
        },
        sessionId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        verifiedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: BaseConnection.getConnection(),
        tableName: "auths",
        modelName: "Auth",
        paranoid: true,
    }
);

export default Auth;
