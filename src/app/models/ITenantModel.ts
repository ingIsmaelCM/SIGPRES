import { DataTypes } from "sequelize";
import { ICommonField } from "../utils/AppInterfaces";

interface ItenantNonStatic<R> {
  getSearchables(): string[];
  getRelations(): Array<keyof R>;
}

export interface ITenantInterface<T, R> {
  new (): ItenantNonStatic<R>;
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
