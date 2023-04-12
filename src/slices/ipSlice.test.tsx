import { renderHook, act, waitFor } from "@testing-library/react";
import { AnyAction, configureStore, Store } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import ipReducer, { fetchIp, initialState } from "./ipSlice";

import { IApiStatus, IApiIp } from "../models/ip";
import { AppDispatch } from "../app/store";
import { server } from "../tests/mocks/server";
import { rest } from "msw";

let store: Store<any, AnyAction>;

describe("ipSlice", () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        ip: ipReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  it("should return the initial state on first run", () => {
    expect(store.getState()).toEqual({ ip: initialState });
  });

  it("should handle pending state", async () => {
    const { result } = renderHook(() => useDispatch<AppDispatch>(), {
      wrapper,
    });

    act(() => {
      result.current(fetchIp());
    });

    const expectedState: IApiIp = {
      data: "",
      status: IApiStatus.Loading,
      error: null,
    };

    expect(store.getState()).toEqual({
      ip: expectedState,
    });
  });

  it("should handle fulfilled state", async () => {
    const { result } = renderHook(() => useDispatch<AppDispatch>(), {
      wrapper,
    });

    act(() => {
      result.current(fetchIp());
    });

    await waitFor(() => {
      const currentState: IApiIp = store.getState().ip;
      expect(currentState.status).toEqual(IApiStatus.Succeeded);
    });

    const expectedState: IApiIp = {
      data: "111.111.111.111",
      status: IApiStatus.Succeeded,
      error: null,
    };

    expect(store.getState()).toEqual({
      ip: expectedState,
    });
  });

  it("should handle rejected state", async () => {
    server.use(
      rest.get("https://ipapi.co/json/", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.text("Request failed with status code 500")
        );
      })
    );

    const { result } = renderHook(() => useDispatch<AppDispatch>(), {
      wrapper,
    });

    act(() => {
      result.current(fetchIp());
    });

    await waitFor(() => {
      const currentState: IApiIp = store.getState().ip;
      expect(currentState.status).toEqual(IApiStatus.Failed);
    });

    expect(store.getState().ip.data).toBe("");
    expect(store.getState().ip.status).toEqual(IApiStatus.Failed);
    expect(store.getState().ip.error).not.toBeNull();
  });
});
