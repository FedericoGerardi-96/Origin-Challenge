import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

/* Reducers */
import { authSlice } from "./auth";
import { actionSlice } from "./actions";
import { TwelveDataSlice } from "./TwelveData";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    action: actionSlice.reducer,
    twelveData: TwelveDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = Promise<boolean>> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
