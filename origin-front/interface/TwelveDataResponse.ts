// Interfaces para la respuesta del pedido de todas las acciones
export interface TwelveDataStocks {
  config: string;
  data: TwelveDataStocks_Data;
  headers: string;
  request: string;
  status: number;
  statusText: string;
}

export interface TwelveDataStocks_Data {
  status: string;
  data: TwelveDataStocks_Data_Action[];
}

export interface TwelveDataStocks_Data_Action {
  country: string;
  currency: string;
  exchange: string;
  mic_code: string;
  name: string;
  symbol: string;
  type: string;
}
////////////////////////////////////////////////////
