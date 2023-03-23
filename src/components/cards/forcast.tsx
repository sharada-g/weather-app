import Datafield from "./datafield";
import snow_icon from "../../assets/snow_icon.svg";
import rain_icon from "../../assets/rain_icon.svg";
import { Forcast } from "../../models/weather";

type ForcastcardProps = {
  data: Forcast | undefined;
};

const Forcastcard = ({ data }: ForcastcardProps) => {
  if (!data) {
    throw new Promise(() => {});
  }
  return (
    <div className="w-full h-full  flex justify-between">
      <div className="h-full flex flex-col justify-center items-start w-2/4 gap-4">
        <h1 className="font-playfair font-medium text-2xl text-left text-primary ">
          Forecast day
        </h1>
        <Datafield label="Chance of Snow" value={`${data?.chanceOfSnow}%`}>
          <img src={snow_icon} alt="snow_icon" />
        </Datafield>
        <Datafield label="Chance of rain" value={`${data?.chanceOfRain}%`}>
          <img src={rain_icon} alt="rain_icon" />
        </Datafield>
      </div>
      <div className="h-full flex flex-col justify-end items-end w-2/4 gap-4">
        <img className="w-24 h-24" src={data?.icon} alt="weather icon" />
        <p className="font-poppins font-extralight text-sm text-primary">
          {data?.condition}
        </p>
      </div>
    </div>
  );
};

export default Forcastcard;
