import appReducer, { initialState, setMethod, setLocation } from "./appSlice";
import { Method } from "../models/app";
import { ILocation } from "../models/location";

describe("appSlice", () => {
  it("should handle initial state", () => {
    expect(appReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setMethod", () => {
    const method = Method.FROMIPADDRESS;
    const action = setMethod(method);
    const state = appReducer(initialState, action);
    expect(state.method).toEqual(Method.FROMIPADDRESS);
  });

  it("should handle setLocation", () => {
    const location: ILocation = {
      id: 1,
      name: "New York",
      region: "NY",
      country: "US",
      lat: 40.7128,
      lon: -74.006,
      url: "",
    };
    const action = setLocation(location);
    const state = appReducer(initialState, action);
    expect(state.location).toEqual(location);
  });
});
