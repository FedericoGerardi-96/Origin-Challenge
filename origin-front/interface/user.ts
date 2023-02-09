export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILogedUser {
  name: string;
  id: string;
  token: string;
}
