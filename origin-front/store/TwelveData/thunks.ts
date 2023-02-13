import axios from "axios";
import dayjs from "dayjs";

import {
  cleanData,
  finishCompleteAction,
  hideGraphic,
  insertData,
  showGraphic,
  startCompleteAction,
} from "./TwelveDataSlice";
import { TwelveDataQuotes_Params, TwelveDataQuotes_Resp } from "../../interface";
import { AppThunk } from "../store";

export const getTwelveData = (params: TwelveDataQuotes_Params): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(startCompleteAction());
      let url: string = "";
      const { symbol, interval, start_date, end_date } = params;
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

      if (start_date === undefined || end_date === undefined) {
        url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`;
      } else {
        url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&start_date=${start_date}&end_date=${end_date}&apikey=${API_KEY}`;
      }
      const TwelveDataResponse: TwelveDataQuotes_Resp = await axios.get(url);

      if(!TwelveDataResponse){
        dispatch(finishCompleteAction());
        dispatch(cleanData());
        dispatch(hideGraphic());
        return false;
      }

      const { data } = TwelveDataResponse;
      const { values, status } = data;

      if (status != "ok") {
        dispatch(finishCompleteAction());
        dispatch(cleanData());
        dispatch(hideGraphic());
        return false;
      }

      dispatch(cleanData());

      values.map(({ datetime: time, close }) => {
        let datetime = dayjs(time).format("YYYY-MM-DD");
        dispatch(insertData({ datetime, close }));
      });
      
      if(values.length === 0){
        dispatch(finishCompleteAction());
        dispatch(cleanData());
        dispatch(hideGraphic());
        return false;
      }
      
      dispatch(showGraphic());
      dispatch(finishCompleteAction());

      return true;
    } catch (error: any) {
      dispatch(finishCompleteAction());
      dispatch(cleanData());
      dispatch(hideGraphic());
      console.log(error);
      return false;
    }
  };
};

export const hiddeGraphic = (): AppThunk => {
  return async (dispatch) => {
    dispatch(finishCompleteAction());
    dispatch(cleanData());
    dispatch(hideGraphic());
    return true;
  }
}