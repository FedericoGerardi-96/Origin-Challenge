// Interfaces para la respuesta del pedido de todas las acciones, para mostrarlas en el autocomplete
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

// Interfaces para la respuesta del pedido de cotizaciónes de una accion, para su posterior grafico
export interface TwelveDataQuotes_Resp {
  config: any;
  data: TwelveDataQuotes_Resp_Data;
  headers: any;
  request: any;
  status: number;
  statusText: string;
}

export interface TwelveDataQuotes_Resp_Data {
  meta: TwelveDataQuotes_Resp_Meta;
  status: string;
  values: TwelveDataQuotes_Resp_Values[];
}

export interface TwelveDataQuotes_Resp_Meta {
  currency: string;
  exchange: string;
  exchange_timezone: string;
  interval: string;
  mic_code: string;
  symbol: string;
  type: string;
}

export interface TwelveDataQuotes_Resp_Values {
  close: string;
  datetime: string;
  high: string;
  low: string;
  open: string;
  volume: string;
}

////////////////////////////////////////////////////

// Interface para los parametros de llamada a la API que trae los datos para posteriormente su grafico
export interface TwelveDataQuotes_Params {
  symbol: string;
  interval: string;
  start_date?: string;
  end_date?: string;
}
////////////////////////////////////////////////////

// Objeto para usar en el grafico
export interface TwelveDataQuotes_Graphic {
  close: string;
  datetime: string;
}

////////////////////////////////////////////////////
