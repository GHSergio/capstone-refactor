import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from "../slice/podcastSlice";
import userReducer from "../slice/userSlice";

export const store = configureStore({
  reducer: {
    podcast: podcastReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
