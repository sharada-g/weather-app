import { createSlice } from "@reduxjs/toolkit";

import { App, Method, Days } from "../../models/app";

export const initialState: App = {
  method: Method.NONE,
  location: null,
  day: Days.TODAY,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMethod: (state, action) => {
      state.method = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setDay: (state, action) => {
      state.day = action.payload;
    },
  },
});
export const selectMethod = (state: any) => state.app.method;
export const selectLocation = (state: any) => state.app.location;
export const selectDay = (state: any) => state.app.day;

export const { setMethod, setLocation, setDay } = appSlice.actions;

export default appSlice.reducer;
