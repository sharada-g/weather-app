import { ipApi } from "../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IApiStatus, IApiIp } from "../models/ip";

export const fetchIp = createAsyncThunk("ip/fetchIp", async () => {
  try {
    const response = await ipApi.get("");
    return response.data;
  } catch (error: any) {
    return error?.message;
  }
});

const initialState: IApiIp = {
  data: "",
  status: IApiStatus.Idle,
  error: null,
};

export const ipSlice = createSlice({
  name: "ip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIp.pending, (state) => {
      state.status = IApiStatus.Loading;
    });
    builder.addCase(fetchIp.fulfilled, (state, action) => {
      if (action.payload != "Network Error") {
        state.status = IApiStatus.Succeeded;
        state.data = action.payload.ip;
      } else {
        state.status = IApiStatus.Failed;
        state.error = action.payload;
      }
    });
    builder.addCase(fetchIp.rejected, (state, action) => {
      console.log(action.error);
      state.status = IApiStatus.Failed;
      state.error = action.error.message;
    });
  },
});

export const selectIpData = (state: any): string => state.ip.data;
export const selectIpStatus = (state: any): IApiStatus => state.ip.status;

export default ipSlice.reducer;
