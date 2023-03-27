import { ILocation } from "./location";

export enum Method {
  NONE,
  FROMIPADDRESS,
  FROMSEARCH,
}

export interface IApp {
  method: Method;
  location: ILocation | null;
}
