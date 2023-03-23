import Datafield from "./datafield";

import temp_icon from "../../assets/temp_icon.svg";
import humidity_icon from "../../assets/humidity_icon.svg";
import pressure_icon from "../../assets/pressure_icon.svg";
import precipitation_icon from "../../assets/precipitation_icon.svg";
import wind_icon from "../../assets/wind_icon.svg";
import cloud_icon from "../../assets/cloud_icon.svg";
import uv_icon from "../../assets/uv_icon.svg";
import visibility_icon from "../../assets/visibility_icon.svg";

const DetailCard = () => {
  return (
    <div className="h-full flex flex-col justify-center gap-4">
      <Datafield label="Max/Min temperature" value="18°/8°">
        <img src={temp_icon} alt="temp_icon" />
      </Datafield>
      <Datafield label="Humidity" value="76">
        <img src={humidity_icon} alt="humidity_icon" />
      </Datafield>
      <Datafield label="Pressure" value="1022.0 mb">
        <img src={pressure_icon} alt="pressure_icon" />
      </Datafield>
      <Datafield label="Precipitation" value="0.1 mm">
        <img src={precipitation_icon} alt="precipitation_icon" />
      </Datafield>
      <Datafield label="Wind" value="17.3 kmp">
        <img src={wind_icon} alt="wind_icon" />
      </Datafield>
      <Datafield label="Cloud" value="80">
        <img src={cloud_icon} alt="cloud_icon" />
      </Datafield>
      <Datafield label="UV Index" value="1.0">
        <img src={uv_icon} alt="uv_icon" />
      </Datafield>
      <Datafield label="Visibility" value="10.0km">
        <img src={visibility_icon} alt="visibility_icon" />
      </Datafield>
    </div>
  );
};

export default DetailCard;
