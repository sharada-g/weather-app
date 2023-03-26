export interface ITitle {
  name: string;
  location: {
    name: string;
    region: string;
    country: string;
  };
  fetchTime: string;
}

export interface IHero {
  temp: number;
  feelsLike: number;
  condition: string;
  icon: string;
}

export interface IForcast {
  chanceOfSnow: number;
  chanceOfRain: number;
  condition: string;
  icon: string;
}

export interface IAstro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
}

export interface IDetails {
  temp: {
    min: number;
    max: number;
  };
  humidity: number;
  pressure: number;
  precipitation: number;
  wind: number;
  cloud: number;
  uvIndex: number;
  visibility: number;
}

export interface IForcastCard {
  name: string;
  temp: number;
  chanceOfSnow: number;
  changeOfRain: number;
  icon: string;
}

export enum Days {
  TODAY,
  TOMORROW,
  DAYAFTERTOMORROW,
  DAYAFTERDAYAFTERTOMORROW,
}

export interface IDay {
  title: ITitle;
  hero: IHero;
  forcast: IForcast;
  astro: IAstro;
  details: IDetails;
  day: IForcastCard[];
}

export interface IWeather {
  today: IDay;
  tomorrow: IDay;
  dayAfterTomorrow: IDay;
  dayAfterDayAfterTomorrow: IDay;
}

export enum IApiStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export interface IApiWeather {
  data: IWeather;
  day?: IDay;
  dayName?: Days;
  status: IApiStatus;
  error: any;
}
