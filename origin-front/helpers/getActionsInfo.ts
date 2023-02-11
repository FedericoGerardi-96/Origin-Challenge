import { IAction, IActionAPIParams } from "../interface";
import axios, { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";

export const getActionsInfo = async (params: IActionAPIParams): Promise<any | null> => {
  try {
    let url: string = "";
    const { symbol, interval, start_date, end_date } = params;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    if (start_date === undefined || end_date === undefined) {
      url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`;
    } else {
      url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&start_date=${start_date}&end_date=${end_date}&apikey=${API_KEY}`;
    }
    const { data }: AxiosResponse = await axios.get<IAction>(url);
    const { values, status } = data;
    if (status != "ok") return null;
    return values.map((date: any) => {
      return {
        close: date.close,
        datetime: dayjs(date.datetime).format("YYYY-MM-DD"),
      };
    });
  } catch (error: any) {
    return null;
  }
};
