import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import reportReducer from "../redux/report/reportSlice";
import cameraReducer from "../redux/camera/cameraSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    cameraConstraints: cameraReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
