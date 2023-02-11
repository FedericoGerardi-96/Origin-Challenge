import axios, { AxiosResponse } from "axios";

import { onChecking, onLogin, onLogout } from "./authSlice";
import { AppThunk } from "../store";

interface ILogInProps {
  email: string;
  password: string;
}

interface IRegisterProps {
  name: String;
  email: string;
  password: string;
}

export const startLogin = ({ email, password }: ILogInProps): AppThunk => {
  return async (dispatch) => {
    dispatch(onChecking());
    try {
      const url = `http://localhost:5000/api/user/login`;

      const data = await axios.post(url, {
        email,
        password,
      });
      const { token, user } = data.data.data;
      const { name, id } = user;

      localStorage.setItem("token", token);
      dispatch(onLogin({ name, id, token }));
      return true;
    } catch (error: any) {
      dispatch(onLogout(error.response.data.message));
      return false;
    }
  };
};

export const startRegister = ({ name, email, password }: IRegisterProps): AppThunk => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:5000/api/user/register`;

      const data = await axios.post(url, {
        name,
        email,
        password,
      });

      return true;
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
        const { data }: AxiosResponse = await axios.post(url, { token });
        const { user } = data.data;
        const { name, userId } = user;
        const id = userId;
        dispatch(onLogin({ name, id, token }));
        return true;
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
