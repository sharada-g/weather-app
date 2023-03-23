import { useSelector } from "react-redux";
import { selectLocation, selectDay } from "../features/app/appSlice";
import { Days } from "../models/app";

import { useGetWeatherQuery } from "../features/weather/weatherSlice";

const useGetWeather = () => {
  const day = useSelector(selectDay);
  const location = useSelector(selectLocation);

  const url = location?.url;

  const {
    data: weatherData,
    isSuccess,
    isError,
    isFetching,
    isLoading,
  } = useGetWeatherQuery(url, {
    skip: !url,
  });

  let data = null;

  switch (day) {
    case Days.TODAY:
      data = weatherData?.today;
      break;
    case Days.TOMORROW:
      data = weatherData?.tomorrow;
      break;
    case Days.DAYAFTERTOMORROW:
      data = weatherData?.dayAfterTomorrow;
      break;
    case Days.DAYAFTERDAYAFTERTOMORROW:
      data = weatherData?.dayAfterDayAfterTomorrow;
      break;
    default:
      data = weatherData?.today;
      break;
  }

  return [
    data,
    weatherData,
    isSuccess,
    ,
    isError,
    isFetching,
    isLoading,
  ] as const;
};

export default useGetWeather;
