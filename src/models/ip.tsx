export enum IApiStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export interface IApiIp {
  data: string;
  status: IApiStatus;
  error: any;
}
