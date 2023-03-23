import weather_icon from "../../assets/weather_icon.svg";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={weather_icon} alt="weather_icon" className="w-16 h-16 pr-1" />
      <div className="flex flex-col w-fit">
        <h1 className="font-poppins text-primary font-bold text-3xl first-letter:text-tertiary first-letter:text-4xl items-start text-shadow">
          Weather
        </h1>
        <h2 className="font-poppins text-secondary font-normal text-2xl text-right ">
          App
        </h2>
      </div>
    </div>
  );
};

export default Logo;
