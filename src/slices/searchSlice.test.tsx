import { renderHook, act, waitFor } from "@testing-library/react";
import { AnyAction, configureStore, Store } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import searchReduder, { fetchSearch, initialState } from "./searchSlice";

import { IApiStatus, IApiLocation } from "../models/location";
import { AppDispatch } from "../app/store";
import { server } from "../tests/mocks/server";
import { rest } from "msw";

let store: Store<any, AnyAction>;

describe("searchSlice", () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        search: searchReduder,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  it("should return the initial state on first run", () => {
    expect(store.getState()).toEqual({ search: initialState });
  });

  it("should handle pending state", async () => {
    const { result } = renderHook(() => useDispatch<AppDispatch>(), {
      wrapper,
    });

    act(() => {
      result.current(fetchSearch("London"));
    });

    const expectedState: IApiLocation = {
      data: [],
      status: IApiStatus.Loading,
      error: null,
    };

    expect(store.getState()).toEqual({
      search: expectedState,
    });
  });

  it("should handle fulfilled state", async () => {
    const { result } = renderHook(() => useDispatch<AppDispatch>(), {
      wrapper,
    });

    act(() => {
      result.current(fetchSearch("London"));
    });

    await waitFor(() => {
      const expectedState: IApiLocation = store.getState().search;
      expect(expectedState.status).toEqual(IApiStatus.Succeeded);
    });

    const expectedState: IApiLocation = {
      data: [
        {
          id: 44418,
          name: "London",
          country: "GB",
          region: "City of London, Greater London",
          lat: 51.52,
          lon: -0.11,
          url: "https://www.weatherapi.com/api-explorer.aspx",
        },
      ],
      status: IApiStatus.Succeeded,
      error: null,
    };

    expect(store.getState()).toEqual({
      search: expectedState,
    });
  });

  it("should handle rejected state", async () => {
    server.use(
      rest.get(
        `https://api.weatherapi.com/v1/search.json?key=${
          import.meta.env.VITE_API_KEY
        }4&q=london`,
        (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.text("Request failed with status code 500")
          );
        }
      )
    );
    const { result } = renderHook(() => useDispatch<AppDispatch>(), {
      wrapper,
    });

    act(() => {
      result.current(fetchSearch("London"));
    });

    await waitFor(() => {
      const expectedState: IApiLocation = store.getState().search;
      expect(expectedState.status).toEqual(IApiStatus.Failed);
    });

    expect(store.getState().search.data).toEqual([]);
    expect(store.getState().search.status).toEqual(IApiStatus.Failed);
    expect(store.getState().search.error).not.toBeNull();
  });
});
