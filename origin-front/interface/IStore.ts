import { IUser } from "./";
import { TwelveDataQuotes_Graphic } from "./";
import { IAction } from "./";

// Interface para el modelo del store Auth del usuario en MySql
export interface IAuthState {
  isSaving: boolean;
  status: "checking" | "authenticated" | "not-authenticated";
  user: object | IUser;
  errorMessage: undefined | string;
}

//Interface para el modelo del store TwelveData
export interface TwelveDataQuotes_Store {
  isSaving: boolean;
  showGraphic: boolean;
  // Data devuelta por la API
  data: TwelveDataQuotes_Graphic[];
}

// Interface para el modelo del store de acciones del usuario en MySql
export interface IUserActionState {
  isSaving: boolean;
  userAction: IAction[];
  errorMessage: undefined | string;
  activeAction: object | IAction;
}
