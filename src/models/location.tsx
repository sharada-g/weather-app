export enum IApiStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export interface IApiLocation {
  data: ILocation[];
  status: IApiStatus;
  error: any;
}

export interface ILocation {
  id: number;
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  url: string;
}
