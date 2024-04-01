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
  operation?: string;
}

export interface ICommonField {
  id?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}


export enum EStatusCode{
  OK = 200,
  Creado = 201,
  NoAutorizado = 401,
  Prohibido = 403,
  NoEncontrado = 404,
  EntidadNoProcesable = 422,
  ErrorInterno = 500
}

export interface IMailOptions{
  subject: string,
  to: string,
  context?: Record<string, any>,
  template: string,
  attachment?: any[],

}