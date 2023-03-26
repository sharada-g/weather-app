import { IForcastCard } from "../../models/weather";
import { useSelector } from "react-redux";
import { selectWeatherDay } from "../../slices/weatherSlice";

import Cardcontainer from "./cardcontainer";

import snow_icon from "../../assets/snow_icon.svg";
import rain_icon from "../../assets/rain_icon.svg";

type TimeCardProps = {
  itemData: IForcastCard;
};

const TimeCard = ({ itemData }: TimeCardProps) => {
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <h1 className="font-poppins font-light text-primary">{itemData?.name}</h1>
      <h2 className="font-playfair font-normal text-3xl text-primary self-start">
        {itemData?.temp}°
      </h2>
      <div className="w-full">
        <div className="w-full h-fit flex justify-start items-center gap-2">
          <img src={snow_icon} alt="snow_icon" className="h-4" />
          <p className="font-poppins font-light text-xs text-primary">
            {itemData?.chanceOfSnow}
          </p>
        </div>
        <div className="w-full h-fit flex justify-end items-center gap-2">
          <img src={rain_icon} alt="rain_icon" className="h-4" />
          <p className="font-poppins font-light text-xs text-primary">
            {itemData?.changeOfRain}
          </p>
        </div>
      </div>
      <img
        className="h-12 object-contain"
        src={itemData?.icon}
        alt="weather icon"
      />
    </div>
  );
};

const DaytimCard = () => {
  const data: IForcastCard[] = useSelector(selectWeatherDay);
  return (
    <Cardcontainer>
      <div className="h-full w-full flex gap-1">
        {data?.map((itemData: IForcastCard, index) => (
          <TimeCard key={index} itemData={itemData} />
        ))}
      </div>
    </Cardcontainer>
  );
};

export default DaytimCard;
