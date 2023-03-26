import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ILocation, IApiStatus, IApiLocation } from "../models/location";

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (city: string) => {
    try {
      const response = await axios.get(
        `search.json?key=${import.meta.env.VITE_API_KEY}&q=${city}`
      );
      return response.data;
    } catch (error: Error | any) {
      return error?.message;
    }
  }
);

const initialState: IApiLocation = {
  data: [],
  status: IApiStatus.Idle,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.status = IApiStatus.Loading;
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.status = IApiStatus.Succeeded;
      const loadedLocations: ILocation[] = action.payload.map((item: any) => ({
        id: item.id,
        name: item.name,
        country: item.country,
        region: item.region,
        lat: item.lat,
        lon: item.lon,
        url: item.url,
      }));
      state.data = loadedLocations;
    });
    builder.addCase(fetchSearch.rejected, (state, action) => {
      state.status = IApiStatus.Failed;
      state.error = action.error;
    });
  },
});

export const selectSearchData = (state: any) => state.search.data;
export const selectSearchStatus = (state: any) => state.search.status;

export default searchSlice.reducer;
