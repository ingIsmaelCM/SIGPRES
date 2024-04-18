import { DataTypes, InitOptions } from "sequelize";
import { ICommonField } from "../interfaces/AppInterfaces";

/* FIXED: Setting static and common interfaces */

export interface ITenantInterface<T, R> {
  modelName: string;
  tableName: string;
  attributes: Record<keyof T, any>;
  additionalOptions:Partial<InitOptions>,
  getSearchables(): Array<keyof T>;
  getRelations(): Array<keyof R>;
}

export function staticImplements<T, R>() {
  return (_constructor: ITenantInterface<T, R>) => {
  };
}
//TODO: Implements interface and declare on each model
export const commonAttributes: Record<keyof ICommonField, any> = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  createdBy: {
    type: DataTypes.INTEGER,
  },
  updatedBy: {
    type: DataTypes.INTEGER,
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
};

const ITM = { staticImplements, commonAttributes };

export default ITM;
