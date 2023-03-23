const Herocard = () => {
  return (
    <div className="h-full flex justify-between items-center">
      <div className="flex flex-col justify-end w-2/4">
        <h1 className="font-playfair font-bold text-8xl text-left text-tertiary text-shadow">
          7°
        </h1>
        <h2 className="font-poppins font-light text-sm text-primary leading-10">
          Feels like : 13°
        </h2>
        <h3 className="font-poppins font-normal text-lg text-primary ">
          Partly cloudy
        </h3>
      </div>
      <img
        className="h-full object-contain"
        src="//cdn.weatherapi.com/weather/128x128/day/116.png"
        alt="forcast icon"
      />
    </div>
  );
};

export default Herocard;
