export interface IAuth {
  id?: number;
  email: string;
  username: string;
  password: string;
  role_id: number;
  name: string;
  lastname: string;
  lastlogin?: string;
  role?: string;
  tenants?: Itenant[]
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
