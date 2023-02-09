import { IUser } from "./user";

export interface IAuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: object | IUser;
  errorMessage: undefined | string;
}
