import { DataTypes, Model, ModelStatic } from "sequelize";
import { ICommonField } from "../utils/AppInterfaces";

/* FIXED: Setting static and common interfaces */

interface ItenantNonStatic<T, R> {
  getSearchables(): Array<keyof T>;
  getRelations(): Array<keyof R>;
}

export interface ITenantInterface<T, R> {
  new (): ItenantNonStatic<T, R>;
  isTenant: boolean;
  modelName: string;
  tableName: string;
  attributes: Record<keyof T, any>;
}

export function staticImplements<T, R>() {
  return (constructor: ITenantInterface<T, R>) => {
    constructor;
  };
}
//TODO: Implemenst interface and declare on each model
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
