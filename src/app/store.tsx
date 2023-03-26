import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../slices/appSlice";
import searchReducer from "../slices/searchSlice";
import weatherReducer from "../slices/weatherSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    search: searchReducer,
    weather: weatherReducer,
  },
});
