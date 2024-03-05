export interface IAuth {
  id?: number;
  email: string;
  username: string;
  password: string;
  sessionId: number;
  name: string;
  lastname: string;
  lastlogin?: string;
  role?: string;
  tenants?: Itenant[];
  permissions?: IPermission[];
  roles?: IRole[];
}

export interface IRole {
  id?: number;
  name: string;
}

export interface IPermission {
  id?: number;
  name: string;
}

export interface Itenant {
  id?: number;
  name: string;
  key: string;
}
