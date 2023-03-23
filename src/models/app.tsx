import { Location } from "./location";

export enum Method {
  NONE,
  FROMIPADDRESS,
  FROMSEARCH,
}

export enum Days {
  TODAY,
  TOMORROW,
  DAYAFTERTOMORROW,
  DAYAFTERDAYAFTERTOMORROW,
}

export interface App {
  method: Method;
  location: Location | null;
  day: Days;
}
