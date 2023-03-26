import { useSelector } from "react-redux";
import { IHero } from "../../models/weather";
import { selectWeatherHero } from "../../slices/weatherSlice";

import Cardcontainer from "./cardcontainer";

const Herocard = () => {
  const data: IHero = useSelector(selectWeatherHero);

  return (
    <Cardcontainer>
      <div className="h-full flex justify-between items-center">
        <div className="flex flex-col justify-end w-2/4">
          <h1 className="font-playfair font-bold text-8xl text-left text-tertiary text-shadow">
            {data?.temp}°
          </h1>
          <h2 className="font-poppins font-light text-sm text-primary leading-10">
            Feels like :{data?.feelsLike} °
          </h2>
          <h3 className="font-poppins font-normal text-lg text-primary ">
            {data?.condition}
          </h3>
        </div>
        <img
          className="h-40 object-contain"
          src={data?.icon.replace("64x64", "128x128")}
          alt="forcast icon"
        />
      </div>
    </Cardcontainer>
  );
};

export default Herocard;
