import Datafield from "./datafield";
import sun_rise_icon from "../../assets/sun_rise_icon.svg";
import sun_set_icon from "../../assets/sun_set_icon.svg";
import moon_rise_icon from "../../assets/moon_rise_icon.svg";
import moon_set_icon from "../../assets/moon_set_icon.svg";
import { Astro } from "../../models/weather";

type AstrocardProps = {
  data: Astro | undefined;
};

const Astrocard = ({ data }: AstrocardProps) => {
  if (!data) {
    throw new Promise(() => {});
  }
  return (
    <div className="h-full flex flex-col justify-center gap-4">
      <h1 className="font-playfair font-medium text-2xl text-left text-primary ">
        Astro
      </h1>
      <div className="flex justify-between gap-10">
        <div className="flex flex-col w-2/4 gap-4">
          <Datafield label="Sunrise" value={`${data?.sunrise}`}>
            <img src={sun_rise_icon} alt="sun_rise_icon" />
          </Datafield>
          <Datafield label="Sunriset" value={`${data?.sunset}`}>
            <img src={sun_set_icon} alt="sun_set_icon" />
          </Datafield>
        </div>
        <div className="flex flex-col w-2/4 gap-4">
          <Datafield label="Moonrise" value={`${data?.moonrise}`}>
            <img src={moon_rise_icon} alt="moon_rise_icon" />
          </Datafield>
          <Datafield label="Moonset" value={`${data?.moonset}`}>
            <img src={moon_set_icon} alt="moon_set_icon" />
          </Datafield>
        </div>
      </div>
    </div>
  );
};

export default Astrocard;
