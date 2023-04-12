import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setDay,
  selectWeatherData,
  selectWeatherStatus,
  selectWeatherDayName,
} from "../slices/weatherSlice";

import { IDay, Days, IWeather, IApiStatus } from "../models/weather";

import Title from "../components/weather/title";
import Forcastcard from "../components/weather/forcast";
import Astrocard from "../components/weather/astro";
import DetailCard from "../components/weather/details";
import DaytimeCard from "../components/weather/daytime";

import Cardcontainer from "../components/weather/cardcontainer";

type StepperButtonsProps = {
  item: IDay;
  index: Days;
};

const StepperButtons = ({ item, index }: StepperButtonsProps) => {
  const dispatch = useDispatch();

  const day = useSelector(selectWeatherDayName);

  const activeClass = day === index ? "border-b-2 border-secondary " : "";

  const handleClick = () => {
    if (item?.title.name === "Tomorrow") dispatch(setDay(Days.TOMORROW));
    else if (item?.title.name === "Day after tomorrow")
      dispatch(setDay(Days.DAYAFTERTOMORROW));
    else dispatch(setDay(Days.DAYAFTERDAYAFTERTOMORROW));
  };

  return (
    <button
      className={`nav  w-full  flex flex-col md:flex-row items-center justify-start gap-2 font-poppins space-x-2.5 ${activeClass}`}
      onClick={handleClick}
    >
      <img
        className="h-8 md:h-10  object-contain"
        src={item?.forcast.icon}
        alt="weather icon"
      />

      <span>
        <h3 className="text-sm xl:text-base font-medium leading-tight">
          {item?.title.name}
        </h3>
        <p className="text-xs xl:text-sm">{item?.forcast.condition}</p>
      </span>
    </button>
  );
};

const Stepper = () => {
  const weatherData: IWeather = useSelector(selectWeatherData);

  return (
    <div className=" w-full flex justify-evenly gap-2 mb-5">
      <StepperButtons item={weatherData?.tomorrow} index={Days.TOMORROW} />
      <StepperButtons
        item={weatherData?.dayAfterTomorrow}
        index={Days.DAYAFTERTOMORROW}
      />
      <StepperButtons
        item={weatherData?.dayAfterDayAfterTomorrow}
        index={Days.DAYAFTERDAYAFTERTOMORROW}
      />
    </div>
  );
};

const ForcastView = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectWeatherStatus);

  useEffect(() => {
    if (status === IApiStatus.Succeeded) {
      dispatch(setDay(Days.TOMORROW));
    }
  }, [status, dispatch]);

  return (
    <div className=" m-4 lg:mt-5">
      <Stepper />
      <div className="grid lg:grid-cols-2 lg:gap-4">
        <div className="lg:col-span-2">
          <Title />
        </div>
        <Cardcontainer>
          {" "}
          <Forcastcard />
        </Cardcontainer>

        <Cardcontainer>
          <Astrocard />
        </Cardcontainer>

        <div className="lg:row-start-2 lg:col-start-2 lg:row-span-3">
          <Cardcontainer>
            <DetailCard />
          </Cardcontainer>
        </div>

        <Cardcontainer>
          <DaytimeCard />
        </Cardcontainer>
      </div>
    </div>
  );
};

export default ForcastView;
