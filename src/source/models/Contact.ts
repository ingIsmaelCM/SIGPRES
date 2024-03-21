import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model, ModelAttributeColumnOptions } from "sequelize";
import { IContact, IContactRelation } from "@app/interfaces/SourceInterfaces";
import Client from "@source/models/Client";

// TODO: Add relationship field to contact table. (Parent, Siblinh, Friend, other
@ITM.staticImplements<IContact, IContactRelation>()
export default class Contact extends Model implements  IContact{

  declare addClient: (clientId: number, options:Record<string, any>)=>any;
  declare setInfo:(infoId: number, options:Record<string, any>)=>any;
  declare id: number;
  declare infoId: number;
  declare lastname: string;
  declare fullname?: string;
  declare name: string;
  declare createdAt?: string;
  declare createdBy?: number;
  declare deletedAt?: string;
  declare updatedAt?: string;
  declare updatedBy?: number;
  getSearchables(): Array<keyof IContact> {
    return ["name", "lastname", "infoId"];
  }

  getRelations(): (keyof IContactRelation)[] {
    return ["clients", "info", "clients.info"];
  }

  static tableName = "contacts";
  static modelName = "Contact";

  static attributes: Record<keyof IContact, ModelAttributeColumnOptions> = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    infoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fullname: {
      type: DataTypes.VIRTUAL,
      get(this: Client) {
        return `${this.name} ${this.lastname}`;
      },
    },
    ...ITM.commonAttributes,
  };

}
