import { weatherApi } from "../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ILocation, IApiStatus, IApiLocation } from "../models/location";

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (city: string) => {
    try {
      const response = await weatherApi.get("search.json", {
        params: {
          q: city,
        },
      });
      return response.data;
    } catch (error: any) {
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
      if (action.payload != "Network Error") {
        state.status = IApiStatus.Succeeded;
        const loadedLocations: ILocation[] = action.payload.map(
          (item: any) => ({
            id: item.id,
            name: item.name,
            country: item.country,
            region: item.region,
            lat: item.lat,
            lon: item.lon,
            url: item.url,
          })
        );
        state.data = loadedLocations;
      } else {
        state.status = IApiStatus.Failed;
        state.error = action.payload;
      }
    });
    builder.addCase(fetchSearch.rejected, (state, action) => {
      state.status = IApiStatus.Failed;
      state.error = action.error.message;
    });
  },
});

export const selectSearchData = (state: any): ILocation[] => state.search.data;
export const selectSearchStatus = (state: any): IApiStatus =>
  state.search.status;

export default searchSlice.reducer;
