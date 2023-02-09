import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthState, ILogedUser } from "../../interface";

const initialState: IAuthState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },

    onLogin: (state, action: PayloadAction<ILogedUser>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = undefined;
    },

    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },

    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
