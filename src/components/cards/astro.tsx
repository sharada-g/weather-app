import Datafield from "./datafield";
import sun_rise_icon from "../../assets/sun_rise_icon.svg";
import sun_set_icon from "../../assets/sun_set_icon.svg";
import moon_rise_icon from "../../assets/moon_rise_icon.svg";
import moon_set_icon from "../../assets/moon_set_icon.svg";

const Astrocard = () => {
  return (
    <div className="h-full flex flex-col justify-center gap-4">
      <h1 className="font-playfair font-medium text-2xl text-left text-primary ">
        Astro
      </h1>
      <div className="flex justify-between gap-10">
        <div className="flex flex-col w-2/4 gap-4">
          <Datafield label="Sunrise" value="07:12 AM">
            <img src={sun_rise_icon} alt="sun_rise_icon" />
          </Datafield>
          <Datafield label="Sunriset" value="07:24 PM">
            <img src={sun_set_icon} alt="sun_set_icon" />
          </Datafield>
        </div>
        <div className="flex flex-col w-2/4 gap-4">
          <Datafield label="Moonrise" value="07:12 PM">
            <img src={moon_rise_icon} alt="moon_rise_icon" />
          </Datafield>
          <Datafield label="Moonset" value="07:12 AM">
            <img src={moon_set_icon} alt="moon_set_icon" />
          </Datafield>
        </div>
      </div>
    </div>
  );
};

export default Astrocard;
