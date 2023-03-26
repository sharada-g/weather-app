import {} from "react";
import { useSelector } from "react-redux";
import { ITitle } from "../../models/weather";

import { selectWeatherTitle } from "../../slices/weatherSlice";

const Title = () => {
  const data: ITitle = useSelector(selectWeatherTitle);
  const title = data
    ? `Weather ${data?.name} in ${
        data?.location.name +
        ", " +
        data?.location.region +
        ", " +
        data?.location.country
      } `
    : "";

  return (
    <div>
      <h1 className="font-playfair font-semibold md:font-medium text-xl md:text-3xl text-primary text-center md:text-left mb-5 md:mb-1">
        {title}
      </h1>
      <h2 className="font-poppins font-light text-sm text-secondary text-left">
        As of {data?.fetchTime}
      </h2>
    </div>
  );
};

export default Title;
