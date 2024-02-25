export interface IParams {
  limit?: number;
  search?: string;
  order?: string;
  desc?: boolean;
  filter?: string[];
  include?: string;
  page?: number;
  perpage?: number;
  fields?: string;
  scopes?: string;
  withtrashed?: boolean;
  onlytrashed?: boolean;
  op?: string;
  isNull?: string;
  notNUll?: string;
  like?: string;
}

export interface IPreference {
  id?: number;
  key: string;
  value: string;
  createdBy: number;
  updatedBy: number;
}
