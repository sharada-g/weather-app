import { useDispatch, useSelector } from "react-redux";

import useGetWeather from "../hooks/useGetweather";

import { setDay, selectDay } from "../features/app/appSlice";
import { Days } from "../models/app";
import { day } from "../models/weather";

import Datacontainer from "../features/weather/weatherContainer";

type StepperButtonsProps = {
  item: day | undefined;
  index: number;
};

const StepperButtons = ({ item, index }: StepperButtonsProps) => {
  const day = useSelector(selectDay);
  const dispatch = useDispatch();

  const activeClass = day == index ? "border-b-2 border-secondary " : "";

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
        className="h-8 md:h-10 lg:h-16 object-contain"
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
  const [data, weatherData] = useGetWeather();

  const mappedWeatherData = [
    weatherData?.tomorrow,
    weatherData?.dayAfterTomorrow,
    weatherData?.dayAfterDayAfterTomorrow,
  ];

  return (
    <div className=" w-full flex justify-evenly gap-2 mb-5">
      {mappedWeatherData.map((day, index) => {
        return <StepperButtons key={index} item={day} index={index + 1} />;
      })}
    </div>
  );
};

const ForcastView = () => {
  const dispatch = useDispatch();

  dispatch(setDay(Days.TOMORROW));
  return (
    <div className="m-4 xl:w-3/5 lg:mt-5">
      <Stepper />
      <Datacontainer />
    </div>
  );
};

export default ForcastView;
