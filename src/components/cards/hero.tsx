import { Hero } from "../../models/weather";

type HerocardProps = {
  data: Hero | undefined;
};

const Herocard = ({ data }: HerocardProps) => {
  return (
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
  );
};

export default Herocard;
