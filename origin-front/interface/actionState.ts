import { IAction } from "./action";

export interface IActionState {
    action: IAction[];
    errorMessage: undefined | string;
  }
  