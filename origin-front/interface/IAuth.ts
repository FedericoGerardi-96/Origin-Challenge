//Interface el modelo de la respuesta de la API del backEnd
export interface IUserResponse {
  config: string;
  data: IUserResponse_Data;
  headers: string;
  request: string;
  status: number;
  statusText: string;
}

export interface IUserResponse_Data {
  mensaje: string;
  ok: boolean;
  data?: IUser;
  token?: string;
}

//Interface para el modelo de usuario de mySql
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser_LoginParams {
  email: string;
  password: string;
}

export interface IUser_RegisterParams {
  name: String;
  email: string;
  password: string;
}

export interface ILogedUser {
  name: string;
  id: string;
  token: string;
}
