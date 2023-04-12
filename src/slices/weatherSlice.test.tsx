import { renderHook, act, waitFor } from "@testing-library/react";
import { AnyAction, configureStore, Store } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import weatherReduder, { fetchWeather, initialState } from "./weatherSlice";

import { IWeather, IDay, Days } from "../models/weather";
import { IApiStatus, IApiWeather } from "../models/weather";
import { AppDispatch } from "../app/store";
import { server } from "../tests/mocks/server";
import { rest } from "msw";

let store: Store<any, AnyAction>;

describe("weatherSlice", () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        weather: weatherReduder,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  it("should return the initial state on first run", () => {
    expect(store.getState()).toEqual({ weather: initialState });
  });

  it("should handle pending state", async () => {
    const { result } = renderHook(() => useDispatch<AppDispatch>(), {
      wrapper,
    });

    act(() => {
      result.current(fetchWeather("London"));
    });

    const expectedState: IApiWeather = {
      data: {} as IWeather,
      day: {} as IDay,
      dayName: Days.TODAY,
      status: IApiStatus.Loading,
      error: null,
    };

    expect(store.getState()).toEqual({
      weather: expectedState,
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
      result.current(fetchWeather("London"));
    });

    await waitFor(() => {
      const expectedState: IApiWeather = store.getState().weather;
      expect(expectedState.status).toEqual(IApiStatus.Failed);
    });

    expect(store.getState().weather.status).toEqual(IApiStatus.Failed);
    expect(store.getState().weather.error).not.toBeNull();
  });
});
