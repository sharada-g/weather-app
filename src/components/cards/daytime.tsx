import snow_icon from "../../assets/snow_icon.svg";
import rain_icon from "../../assets/rain_icon.svg";

type TimeCardProps = {
  time: string;
  temp: number;
  snow: string;
  rain: string;
  image: string;
};

const TimeCard = ({ time, temp, snow, rain, image }: TimeCardProps) => {
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <h1 className="font-poppins font-light text-primary">{time}</h1>
      <h2 className="font-playfair font-normal text-3xl text-primary self-start">
        {temp}°
      </h2>
      <div className="w-full">
        <div className="w-full h-fit flex justify-start items-center gap-2">
          <img src={snow_icon} alt="snow_icon" className="h-4" />
          <p className="font-poppins font-light text-xs text-primary">{snow}</p>
        </div>
        <div className="w-full h-fit flex justify-end items-center gap-2">
          <img src={rain_icon} alt="rain_icon" className="h-4" />
          <p className="font-poppins font-light text-xs text-primary">{rain}</p>
        </div>
      </div>
      <img className="h-12 object-contain" src={image} alt="weather icon" />
    </div>
  );
};

const DaytimCard = () => {
  return (
    <div className="h-full w-full flex gap-1">
      <TimeCard
        time="Morning"
        temp={8}
        snow="80%"
        rain="5%"
        image="//cdn.weatherapi.com/weather/128x128/night/176.png"
      />
      <TimeCard
        time="Afternoon"
        temp={18}
        snow="62%"
        rain="45%"
        image="//cdn.weatherapi.com/weather/128x128/day/116.png"
      />
      <TimeCard
        time="Evening"
        temp={20}
        snow="96%"
        rain="34%"
        image="//cdn.weatherapi.com/weather/128x128/day/176.png"
      />
      <TimeCard
        time="Overnight"
        temp={17}
        snow="95%"
        rain="25%"
        image="//cdn.weatherapi.com/weather/128x128/night/116.png"
      />
    </div>
  );
};

export default DaytimCard;
