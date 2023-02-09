import axios from "axios";

import Cookies from "js-cookie";

import { onChecking, onLogin, onLogout, clearErrorMessage } from "./authSlice";
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

      Cookies.set("token", token);
      dispatch(onLogin({ name, id, token }));
      return true;
    } catch (error: any) {
      console.log(error.response.data.message);
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
      console.log(error.response.data.message);
      dispatch(onLogout(error.response.data.message));
      return false;
    }
  };
};
