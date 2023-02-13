//Interface el modelo de la respuesta de la API del backEnd
export interface IUserDataBaseAction {
  config: string;
  data: IUserDataBaseAction_Data;
  headers: string;
  request: string;
  status: number;
  statusText: string;
}
export interface IUserDataBaseAction_Data {
  ok: boolean;
  data?: IAction[];
  mensaje: string;
}

// Interface para el modelo de las acciones guardadas en MySql
export interface IAction {
  id?: string;
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country: string;
  type: string;
}
