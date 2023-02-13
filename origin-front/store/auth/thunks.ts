import axios, { AxiosResponse } from "axios";

import { finishSaving, onChecking, onLogin, onLogout, startSaving } from "./authSlice";
import { AppThunk } from "../store";
import { IUserResponse, IUser_LoginParams, IUser_RegisterParams } from "../../interface";

export const startLogin = ({ email, password }: IUser_LoginParams): AppThunk => {
  return async (dispatch) => {
    dispatch(onChecking());
    try {
      const url = `http://localhost:5000/api/user/login`;

      const userDataBaseResponse: IUserResponse = await axios.post(url, {
        email,
        password,
      });

      if (!userDataBaseResponse) return false;

      const { token: tokenResp, data, ok } = userDataBaseResponse.data;

      if (!ok) {
        dispatch(onLogout("Error"));
        return ok;
      }
      const { name, id } = data!;
      const token = tokenResp!;
      localStorage.setItem("token", token!);
      dispatch(onLogin({ name, id, token }));

      return ok;
    } catch (error: any) {
      dispatch(onLogout(error.response.data.message));
      return false;
    }
  };
};

export const startRegister = ({ name, email, password }: IUser_RegisterParams): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(startSaving());
      const url = `http://localhost:5000/api/user/register`;

      const userDataBaseResponse: IUserResponse = await axios.post(url, {
        name,
        email,
        password,
      });

      if (!userDataBaseResponse) return false;

      const { ok } = userDataBaseResponse.data;
      dispatch(finishSaving());
      return ok;
    } catch (error: any) {
      dispatch(onLogout(error.response.data.message));
      return false;
    }
  };
};

export const startLogOut = (): AppThunk => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch(onLogout(undefined));
      return true;
    } catch (error: any) {
      dispatch(onLogout(error.response.data.message));
      return false;
    }
  };
};

export const checkToken = (): AppThunk => {
  return async (dispatch) => {
    dispatch(onChecking());
    const token = localStorage.getItem("token") || "";
    try {
      if (token != "") {
        const url = `http://localhost:5000/api/user/check-token`;
        const userDataBaseResponse: IUserResponse = await axios.post(url, { token });

        if (!userDataBaseResponse) return false;

        const { data, ok } = userDataBaseResponse.data;

        if (!ok) return ok;

        const { name, id } = data!;

        dispatch(onLogin({ name, id, token }));

        return ok;
      } else {
        dispatch(onLogout());
        return false;
      }
    } catch (error: any) {
      dispatch(onLogout("Error inesperado"));
      return false;
    }
  };
};
