import { DataTypes } from "sequelize";
import { ICommonField } from "../utils/AppInterfaces";

/* FIXED: Setting static and common interfaces */

interface ItenantNonStatic<T, R> {
  getSearchables(): Array<keyof T>;
  getRelations(): Array<keyof R>;
}

export interface ITenantInterface<T, R> {
  new (): ItenantNonStatic<T, R>;
  modelName: string;
  tableName: string;
  attributes: Record<keyof T, any>;
}

export function staticImplements<T, R>() {
  return (_constructor: ITenantInterface<T, R>) => {
  };
}
//TODO: Implements interface and declare on each model
export const commonAttributes: Record<keyof ICommonField, any> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
