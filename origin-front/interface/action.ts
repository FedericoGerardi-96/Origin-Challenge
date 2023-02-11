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

export interface IActionAPIParams {
  symbol: string;
  interval: string;
  start_date?: string;
  end_date?: string;
}
