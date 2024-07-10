import BaseConnection from "@/app/db/BaseConnection";
import {IModel} from "@/app/models/IModel";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";

class Tenant
    extends Model<InferAttributes<Tenant>, InferCreationAttributes<Tenant>>
    implements IModel {

    [x: string]: any;
    declare id: string;
    declare name: string;
    declare key: string;

    declare createdAt: string;
    declare updatedAt: string;


   static getRelations(): string[] {
        return ["auths","auths.roles.permissions","auths.permissions"];
    }

   static  getSearchables(): string[] {
        return ["name", "key"];
    }
}

Tenant.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        createdAt: {
            type: DataTypes.DATEONLY,
        },

        updatedAt: {
            type: DataTypes.DATEONLY,
        },
    },
    {
        modelName: "Tenant",
        tableName: "tenants",
        sequelize: BaseConnection.getConnection(),
        paranoid: true,
        defaultScope:{
            order:[ "createdAt"]
        }
    }
);

export default Tenant;
