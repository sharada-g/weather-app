import { apiSlice } from "../api/apiSlice";
import { Weather, day } from "../../models/weather";

const getDayData = (day: number, response: any): day => {
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

export const weatherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (city: string) =>
        `forecast.json?key=${
          import.meta.env.VITE_API_KEY
        }&q=${city}&days=4&aqi=no&alerts=no`,
      transformResponse: (response: any) => {
        const loadedWeather: Weather = {
          today: getDayData(0, response),
          tomorrow: getDayData(1, response),
          dayAfterTomorrow: getDayData(2, response),
          dayAfterDayAfterTomorrow: getDayData(3, response),
        };

        return loadedWeather;
      },
      providesTags: ["Weather"],
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApiSlice;
