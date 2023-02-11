import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { actionSlice } from "./actions";

/* Reducers */
import { authSlice } from "./auth";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    action: actionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = Promise<boolean>> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
