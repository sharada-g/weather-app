import { useEffect } from "react";
import { Days, IApiStatus } from "../models/weather";
import { useDispatch, useSelector } from "react-redux";
import { selectWeatherStatus, setDay } from "../slices/weatherSlice";

import Title from "../components/weather/title";
import Herocard from "../components/weather/hero";
import Forcastcard from "../components/weather/forcast";
import Astrocard from "../components/weather/astro";
import DetailCard from "../components/weather/details";
import DaytimeCard from "../components/weather/daytime";

const Today = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectWeatherStatus);

  useEffect(() => {
    if (status == IApiStatus.Succeeded) {
      dispatch(setDay(Days.TODAY));
    }
  }, [status, dispatch]);

  return (
    <div className="m-4 lg:mt-20">
      <div className="grid lg:grid-cols-2 gap-2 lg:gap-4">
        <div className="lg:col-span-2">
          <Title />
        </div>
        <Herocard />
        <Forcastcard />
        <Astrocard />
        <div className="lg:row-start-2 lg:col-start-2 lg:row-span-2">
          <DetailCard />
        </div>
        <DaytimeCard />
      </div>
    </div>
  );
};

export default Today;
