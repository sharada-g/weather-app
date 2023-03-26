import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  IWeather,
  IDay,
  Days,
  ITitle,
  IHero,
  IDetails,
  IForcast,
  IAstro,
  IForcastCard,
} from "../models/weather";
import { IApiStatus, IApiWeather } from "../models/weather";

const getDayData = (day: number, response: any): IDay => {
  let name = "";

  switch (day) {
    case 0:
      name = "Today";
      break;
    case 1:
      name = "Tomorrow";
      break;
    case 2:
      name = "Day after tomorrow";
      break;
    case 3:
      name = response.forecast.forecastday[day].date;
    default:
      break;
  }
  return {
    title: {
      name,
      location: {
        name: response.location.name,
        region: response.location.region,
        country: response.location.country,
      },
      fetchTime: response.current.last_updated,
    },
    hero: {
      temp: response.current.temp_c,
      feelsLike: response.current.feelslike_c,
      condition: response.current.condition.text,
      icon: response.current.condition.icon,
    },
    forcast: {
      chanceOfSnow: response.forecast.forecastday[day].day.daily_chance_of_snow,
      chanceOfRain: response.forecast.forecastday[day].day.daily_chance_of_rain,
      condition: response.forecast.forecastday[day].day.condition.text,
      icon: response.forecast.forecastday[day].day.condition.icon,
    },
    astro: {
      sunrise: response.forecast.forecastday[day].astro.sunrise,
      sunset: response.forecast.forecastday[day].astro.sunset,
      moonrise: response.forecast.forecastday[day].astro.moonrise,
      moonset: response.forecast.forecastday[day].astro.moonset,
    },
    details: {
      temp: {
        min: response.forecast.forecastday[day].day.mintemp_c,
        max: response.forecast.forecastday[day].day.maxtemp_c,
      },
      humidity: response.forecast.forecastday[day].day.avghumidity,
      pressure: response.current.pressure_mb,
      precipitation: response.forecast.forecastday[day].day.totalprecip_mm,
      wind: response.forecast.forecastday[day].day.maxwind_kph,
      cloud: response.current.cloud,
      uvIndex: response.forecast.forecastday[day].day.uv,
      visibility: response.forecast.forecastday[day].day.avgvis_km,
    },
    day: [
      {
        name: "Morning",
        temp: response.forecast.forecastday[day].hour[6].temp_c,
        chanceOfSnow: response.forecast.forecastday[day].hour[6].chance_of_snow,
        changeOfRain: response.forecast.forecastday[day].hour[6].chance_of_rain,
        icon: response.forecast.forecastday[day].hour[6].condition.icon,
      },
      {
        name: "Afternoon",
        temp: response.forecast.forecastday[day].hour[12].temp_c,
        chanceOfSnow:
          response.forecast.forecastday[day].hour[12].chance_of_snow,
        changeOfRain:
          response.forecast.forecastday[day].hour[12].chance_of_rain,
        icon: response.forecast.forecastday[day].hour[12].condition.icon,
      },
      {
        name: "Evening",
        temp: response.forecast.forecastday[day].hour[18].temp_c,
        chanceOfSnow:
          response.forecast.forecastday[day].hour[18].chance_of_snow,
        changeOfRain:
          response.forecast.forecastday[day].hour[18].chance_of_rain,
        icon: response.forecast.forecastday[day].hour[18].condition.icon,
      },
      {
        name: "Overnight",
        temp: response.forecast.forecastday[day].hour[23].temp_c,
        chanceOfSnow:
          response.forecast.forecastday[day].hour[23].chance_of_snow,
        changeOfRain:
          response.forecast.forecastday[day].hour[23].chance_of_rain,
        icon: response.forecast.forecastday[day].hour[23].condition.icon,
      },
    ],
  };
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string) => {
    try {
      const response = await axios.get(
        `forecast.json?key=${
          import.meta.env.VITE_API_KEY
        }&q=${city}&days=4&aqi=no&alerts=no`
      );
      return response.data;
    } catch (error: Error | any) {
      return error?.message;
    }
  }
);
const initialState: IApiWeather = {
  data: {} as IWeather,
  day: {} as IDay,
  dayName: Days.TODAY,
  status: IApiStatus.Idle,
  error: null,
};

export const weattherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setDay: (state, action) => {
      const day: Days = action.payload;

      switch (day) {
        case Days.TODAY:
          state.dayName = Days.TODAY;
          state.day = state.data.today;
          break;
        case Days.TOMORROW:
          state.dayName = Days.TOMORROW;
          state.day = state.data.tomorrow;
          break;
        case Days.DAYAFTERTOMORROW:
          state.dayName = Days.DAYAFTERTOMORROW;
          state.day = state.data.dayAfterTomorrow;
          break;
        case Days.DAYAFTERDAYAFTERTOMORROW:
          state.dayName = Days.DAYAFTERDAYAFTERTOMORROW;
          state.day = state.data.dayAfterDayAfterTomorrow;
          break;
        default:
          state.dayName = Days.TODAY;
          state.day = state.data.today;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.status = IApiStatus.Loading;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.status = IApiStatus.Succeeded;
      const response = action.payload;
      const loadedWeather: IWeather = {
        today: getDayData(0, response),
        tomorrow: getDayData(1, response),
        dayAfterTomorrow: getDayData(2, response),
        dayAfterDayAfterTomorrow: getDayData(3, response),
      };
      state.data = loadedWeather;
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.status = IApiStatus.Failed;
      state.error = action.error.message;
    });
  },
});

export const selectWeatherStatus = (state: any) => state.weather.status;

export const selectWeatherData = (state: any): IWeather => state.weather.data;

export const selectWeatherTitle = (state: any): ITitle =>
  state.weather.day.title;
export const selectWeatherHero = (state: any) => state.weather.day.hero;
export const selectWeatherForcast = (state: any): IForcast =>
  state.weather.day.forcast;
export const selectWeatherAstro = (state: any): IAstro =>
  state.weather.day.astro;
export const selectWeatherDetails = (state: any): IDetails =>
  state.weather.day.details;
export const selectWeatherDay = (state: any): IForcastCard[] =>
  state.weather.day.day;

export const selectWeatherDayName = (state: any): Days => state.weather.dayName;
export const { setDay } = weattherSlice.actions;

export default weattherSlice.reducer;
