export interface IAuth {
  id?: string;
  email?: string;
  username: string;
  password: string;
  sessionId: string;
  infoId?: string;
  name: string;
  lastname: string;
  lastlogin?: string;

}

export interface  IAuthRelation{
  role?: string;
  tenants?: Itenant[];
  permissions?: IPermission[];
  roles?: IRole[];
  "roles.auths": IRole[],
  "roles.permissions": IRole[]
}

export interface IRole {
  id?: string;
  name: string;
}

export interface IPermission {
  id?: string;
  name: string;
}

export interface Itenant {
  id?: string;
  name: string;
  key: string;
}
