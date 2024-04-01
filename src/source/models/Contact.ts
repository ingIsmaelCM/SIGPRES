import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model, ModelAttributeColumnOptions } from "sequelize";
import { IContact, IContactRelation } from "@app/interfaces/SourceInterfaces";
import Client from "@source/models/Client";
import Info from "@source/models/Info";
import tools from "@app/utils/tools";

// TODO: Add relationship field to contact table. (Parent, Siblinh, Friend, other
@ITM.staticImplements<IContact, IContactRelation>()
export default class Contact extends Model implements  IContact{


  declare id: number;
  declare infoId: string;
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
    return ["clients", "info",];
  }

  static tableName = "contacts";
  static modelName: string = "Contact";
  static additionalOptions={
  }
  static attributes: Record<keyof IContact, ModelAttributeColumnOptions> = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(this: Contact, value: string){
        this.setDataValue("name",tools.initialToUpper(value))
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      set(this: Contact, value: string){
        this.setDataValue("lastname",tools.initialToUpper(value))
      }
    },
    infoId: {
      type: DataTypes.STRING,
      allowNull: false,
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
