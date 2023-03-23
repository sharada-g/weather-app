import Datafield from "./datafield";
import snow_icon from "../../assets/snow_icon.svg";
import rain_icon from "../../assets/rain_icon.svg";

const Forcastcard = () => {
  return (
    <div className="w-full h-full  flex justify-between">
      <div className="h-full flex flex-col justify-center items-start w-2/4 gap-4">
        <h1 className="font-playfair font-medium text-2xl text-left text-primary ">
          Forecast day
        </h1>
        <Datafield label="Chance of Snow" value="0%">
          <img src={snow_icon} alt="snow_icon" />
        </Datafield>
        <Datafield label="Chance of rain" value="86%">
          <img src={rain_icon} alt="rain_icon" />
        </Datafield>
      </div>
      <div className="h-full flex flex-col justify-end items-end w-2/4 gap-4">
        <img
          className="w-24 h-24"
          src=" //cdn.weatherapi.com/weather/128x128/day/176.png"
          alt="weather icon"
        />
        <p className="font-poppins font-extralight text-sm text-primary">
          Patchy rain possible
        </p>
      </div>
    </div>
  );
};

export default Forcastcard;
