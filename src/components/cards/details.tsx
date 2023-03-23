import Datafield from "./datafield";

import temp_icon from "../../assets/temp_icon.svg";
import humidity_icon from "../../assets/humidity_icon.svg";
import pressure_icon from "../../assets/pressure_icon.svg";
import precipitation_icon from "../../assets/precipitation_icon.svg";
import wind_icon from "../../assets/wind_icon.svg";
import cloud_icon from "../../assets/cloud_icon.svg";
import uv_icon from "../../assets/uv_icon.svg";
import visibility_icon from "../../assets/visibility_icon.svg";
import { Details } from "../../models/weather";

type DetailCardProps = {
  data: Details | undefined;
};

const DetailCard = ({ data }: DetailCardProps) => {
  if (!data) {
    throw new Promise(() => {});
  }
  return (
    <div className="h-full flex flex-col justify-center gap-4">
      <Datafield
        label="Max/Min temperature"
        value={`${data?.temp.max}°/${data?.temp.min}°`}
      >
        <img src={temp_icon} alt="temp_icon" />
      </Datafield>
      <Datafield label="Humidity" value={`${data?.humidity}`}>
        <img src={humidity_icon} alt="humidity_icon" />
      </Datafield>
      <Datafield label="Pressure" value={`${data?.pressure}mb`}>
        <img src={pressure_icon} alt="pressure_icon" />
      </Datafield>
      <Datafield label="Precipitation" value={`${data?.precipitation}mm`}>
        <img src={precipitation_icon} alt="precipitation_icon" />
      </Datafield>
      <Datafield label="Wind" value={`${data?.wind}kmp`}>
        <img src={wind_icon} alt="wind_icon" />
      </Datafield>
      <Datafield label="Cloud" value={`${data?.cloud}`}>
        <img src={cloud_icon} alt="cloud_icon" />
      </Datafield>
      <Datafield label="UV Index" value={`${data?.uvIndex}`}>
        <img src={uv_icon} alt="uv_icon" />
      </Datafield>
      <Datafield label="Visibility" value={`${data?.visibility}km`}>
        <img src={visibility_icon} alt="visibility_icon" />
      </Datafield>
    </div>
  );
};

export default DetailCard;
