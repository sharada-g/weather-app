import { createSlice } from "@reduxjs/toolkit";

import { IApp, Method } from "../models/app";

export const initialState: IApp = {
  method: Method.NONE,
  location: null,
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
  },
});
export const selectMethod = (state: any) => state.app.method;
export const selectLocation = (state: any) => state.app.location;

export const { setMethod, setLocation } = appSlice.actions;

export default appSlice.reducer;
