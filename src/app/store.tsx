import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../slices/appSlice";
import ipReducer from "../slices/ipSlice";
import searchReducer from "../slices/searchSlice";
import weatherReducer from "../slices/weatherSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    ip: ipReducer,
    search: searchReducer,
    weather: weatherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
