import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { AnyAction, configureStore, Store } from "@reduxjs/toolkit";

import { IApp, Method } from "../models/app";
import appReducer from "../slices/appSlice";
import { initialState } from "../slices/appSlice";
import useLocalstorage from "./useLocalstorage";

let store: Store<unknown, AnyAction>;

describe("useLocalstorage", () => {
  beforeEach(() => {
    localStorage.clear();

    store = configureStore({
      reducer: {
        app: appReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  });

  afterAll(() => {
    localStorage.clear();
  });

  it("localStorage should not have any stored data", () => {
    expect(localStorage.getItem("weather_app")).toBeNull();
  });

  it("should return the initial state value", () => {
    const { result } = renderHook(() => useLocalstorage(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current[0]).toEqual(initialState);
  });

  it("should return the stored value and update localStorage", () => {
    const testAppData: IApp = {
      method: Method.NONE,
      location: {
        id: 0,
        name: "",
        region: "",
        country: "",
        lat: 0,
        lon: 0,
        url: "",
      },
    };

    const { result } = renderHook(() => useLocalstorage(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current[0]).toEqual(initialState);

    // Call setValue
    act(() => {
      result.current[1](testAppData);
    });
    // Expect localStorage is being set
    expect(localStorage.getItem("weather_app")).toEqual(
      JSON.stringify(testAppData)
    );
    // Expect storedValue is being set
    expect(result.current[0]).toEqual(testAppData);
  });
});
