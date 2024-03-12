import ITM from "@/app/models/ITenantModel";
import { DataTypes, Model } from "sequelize";
import { IContact, IContactRelation } from "../utils/SourceInterfaces";
import Client from "@source/models/Client";

@ITM.staticImplements<IContact, IContactRelation>()
export default class Contact extends Model implements  IContact{

  declare addClient: Function;
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
    return ["clients", "info"];
  }

  static tableName = "contacts";
  static modelName = "Contact";

  static attributes = {
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
