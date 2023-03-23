import { apiSlice } from "../api/apiSlice";
import { Location } from "../../models/location";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: (city: string) =>
        `search.json?key=${import.meta.env.VITE_API_KEY}&q=${city}`,
      transformResponse: (response: Location[]) => {
        const loadedLocations: Location[] = response.map((item: any) => ({
          id: item.id,
          name: item.name,
          country: item.country,
          region: item.region,
          lat: item.lat,
          lon: item.lon,
          url: item.url,
        }));
        return loadedLocations;
      },
      providesTags: ["Location"],
    }),
  }),
});

export const { useGetLocationsQuery } = searchApiSlice;
