import axios from "axios";

import {
  insertActions,
  insertNewActions,
  cleanActions,
  deleteAction,
  startSaving,
  insertActiveActions,
} from "./actionsSlice";
import { AppThunk } from "../store";
import { IUserDataBaseAction, IAction, IUser } from "../../interface";

export const startInsertAction = (action: IAction): AppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(startSaving());
      const { user } = getState().auth;
      const { id } = user as IUser;

      const url = `http://localhost:5000/api/action`;
      const userActionsResponse: IUserDataBaseAction = await axios.post(url, { ...action, id });

      if (!userActionsResponse) return false;

      const { ok } = userActionsResponse.data;

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
      dispatch(startSaving());
      const { user } = getState().auth;
      const { id } = user as IUser;

      const url = `http://localhost:5000/api/action/actionsUsers`;
      const userActionsResponse: IUserDataBaseAction = await axios.post(url, { id });

      if (!userActionsResponse) return false;

      const { ok, data: actions } = userActionsResponse.data;

      dispatch(cleanActions());

      if (!ok) return false;
      actions!.map((action: IAction) => {
        dispatch(insertActions(action));
      });

      return true;
    } catch (error: any) {
      return false;
    }
  };
};

export const startDeleteAction = (id: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(startSaving());
      const url = `http://localhost:5000/api/action`;
      const userActionsResponse: IUserDataBaseAction = await axios.delete(url, { data: { id: id } });

      if (!userActionsResponse) return false;

      const { ok } = userActionsResponse.data;
      if (!ok) return false;

      dispatch(deleteAction(id));

      return true;
    } catch (error: any) {
      return false;
    }
  };
};

export const startinsertActiveAction = (id: string): AppThunk => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:5000/api/action/ActionsId`;
      const userActionsResponse: any = await axios.post(url, { id: id });

      if (!userActionsResponse) return false;

      const { ok, data: action } = userActionsResponse.data;

      if (!ok) return false;
      localStorage.setItem("action", action.id);
      dispatch(insertActiveActions(action));

      return true;
    } catch (error: any) {
      return false;
    }
  };
};

export const startGetActiveAction = (): AppThunk => {
  return async (dispatch) => {
    try {
      const actionId = localStorage.getItem("action") || "";
      if (actionId === "") return false;
      const url = `http://localhost:5000/api/action/ActionsId`;
      const userActionsResponse: any = await axios.post(url, { id: actionId });

      if (!userActionsResponse) return false;

      const { ok, data: action } = userActionsResponse.data;

      if (!ok) return false;
      localStorage.setItem("action", action.id);
      dispatch(insertActiveActions(action));

      return true;
    } catch (error: any) {
      return false;
    }
  };
};
