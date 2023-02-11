import axios from "axios";

import { TwelveDataStocks, TwelveDataStocks_Data_Action } from "../interface";

export const getActions = async (): Promise<TwelveDataStocks_Data_Action[] | null> => {
  try {
    const url = `https://api.twelvedata.com/stocks?source=docs&exchange=NYSE`;
    const TwelveDataResponse: TwelveDataStocks = await axios.get(url);
    const { data } = TwelveDataResponse;
    const { data: ActionsList } = data;
    return ActionsList;
  } catch (error: any) {
    return null;
  }
};
