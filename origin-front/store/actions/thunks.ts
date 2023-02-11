import axios, { AxiosResponse } from "axios";

import { insertActions, insertNewActions, cleanActions, deleteAction } from "./actionsSlice";
import { AppThunk } from "../store";
import { IAction, IUser } from "../../interface";

export const startInsertAction = (action: IAction): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().auth;
      const { id } = user as IUser;
      const url = `http://localhost:5000/api/action`;
      const { data }: AxiosResponse = await axios.post<IAction>(url, { ...action, id });
      const { ok } = data;
      if (!ok) return false;
      dispatch(insertNewActions({ ...action, id }));
      return true;
    } catch (error: any) {
      return false;
    }
  };
};

export const startGetAction = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().auth;
      const { id } = user as IUser;
      const url = `http://localhost:5000/api/action/actionsUsers`;
      const { data }: AxiosResponse = await axios.post<IAction>(url, { id });
      const { ok, data: actions } = data;
      dispatch(cleanActions());
      if (!ok) return false;
      actions.map((action: IAction) => {
        dispatch(insertActions(action));
      });
      return true;
    } catch (error: any) {
      return false;
    }
  };
};

export const startDeleteAction = (id: string): AppThunk => {
  return async (dispatch, getState) => {
    console.log(id);
    try {
      const url = `http://localhost:5000/api/action`;
      const { data: dataresp }: AxiosResponse = await axios.delete<IAction>(url, { data: { id: id } });
      const { ok } = dataresp;
      if (!ok) return false;
      dispatch(deleteAction(id));
      return true;
    } catch (error: any) {
      return false;
    }
  };
};
