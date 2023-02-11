import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAction, IActionState } from "../../interface";

const initialState: IActionState = {
  action: [],
  errorMessage: undefined,
};

export const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    cleanActions: (state) => {
      state.action = [];
    },
    insertActions: (state, action: PayloadAction<IAction>) => {
      state.action.push(action.payload);
      state.errorMessage = undefined;
    },
    insertNewActions: (state, action: PayloadAction<IAction>) => {
      state.action.push(action.payload);
      state.errorMessage = undefined;
    },
    deleteAction: (state, action: PayloadAction<string>) => {
      state.action.splice(
        state.action.findIndex((actions) => actions.id === action.payload),
        1
      );
      state.errorMessage = undefined;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { insertActions, cleanActions, insertNewActions, deleteAction, clearErrorMessage } = actionSlice.actions;
