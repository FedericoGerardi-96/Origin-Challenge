import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TwelveDataQuotes_Graphic, TwelveDataQuotes_Store } from "../../interface";

const initialState: TwelveDataQuotes_Store = {
  isSaving: false,
  data: [],
  showGraphic: false,
};

export const TwelveDataSlice = createSlice({
  name: "TwelveData",
  initialState,
  reducers: {
    startCompleteAction: (state) => {
      state.isSaving = true;
    },
    finishCompleteAction: (state) => {
      state.isSaving = false;
    },
    hideGraphic: (state) => {
      state.showGraphic = false;
    },
    showGraphic: (state) => {
      state.showGraphic = true;
    },
    cleanData: (state) => {
      state.data = [];
    },
    insertData: (state, action: PayloadAction<TwelveDataQuotes_Graphic>) => {
      state.data.push(action.payload);
    },
  },
});

export const { startCompleteAction, showGraphic, hideGraphic, finishCompleteAction, cleanData, insertData } =
  TwelveDataSlice.actions;
