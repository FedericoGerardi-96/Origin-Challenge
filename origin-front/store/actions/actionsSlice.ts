import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserActionState, IAction } from "../../interface";

const initialState: IUserActionState = {
  isSaving: false,
  userAction: [],
  errorMessage: undefined,
  activeAction: {},
};

export const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    startSaving: (state) => {
      state.isSaving = true;
    },
    cleanActions: (state) => {
      state.userAction = [];
    },
    insertActions: (state, action: PayloadAction<IAction>) => {
      state.userAction.push(action.payload);
      state.errorMessage = undefined;
      state.isSaving = false;
    },
    insertNewActions: (state, action: PayloadAction<IAction>) => {
      state.userAction.push(action.payload);
      state.errorMessage = undefined;
      state.isSaving = false;
    },
    deleteAction: (state, action: PayloadAction<string>) => {
      state.userAction.splice(state.userAction.findIndex((actions) => actions.id === action.payload));
      state.errorMessage = undefined;
      state.isSaving = false;
    },
    insertActiveActions: (state, action: PayloadAction<IAction>) => {
      state.activeAction = action.payload;
      state.errorMessage = undefined;
    },
    deleteActiveActions: (state, action: PayloadAction<IAction>) => {
      state.activeAction = action.payload;
      state.errorMessage = undefined;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  insertActions,
  startSaving,
  cleanActions,
  insertNewActions,
  deleteAction,
  insertActiveActions,
  deleteActiveActions,
  clearErrorMessage,
} = actionSlice.actions;
