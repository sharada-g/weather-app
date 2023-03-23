import { useState } from "react";

import Datacontainer from "../components/cards/datacontainer";

type StepperButtonsProps = {
  id: number;
  name: string;
  date: string;
  active: boolean;
  image: string;
  onClick: (id: number) => void;
};

const StepperButtons = ({
  id,
  name,
  date,
  active,
  image,
  onClick,
}: StepperButtonsProps) => {
  const handleClick = () => {
    onClick(id);
  };

  const activeClass = active ? "border-b-2 border-secondary rounded" : "";

  return (
    <button
      className={`nav flex items-center gap-2 font-poppins space-x-2.5 ${activeClass}`}
      onClick={handleClick}
    >
      <img className="h-12 object-contain" src={image} alt="weather icon" />

      <span>
        <h3 className="font-medium leading-tight">{name}</h3>
        <p className="text-sm">{date}</p>
      </span>
    </button>
  );
};

const Stepper = () => {
  const [active, setActive] = useState<number>(1);

  const handleClick = (id: number) => {
    setActive(id);
  };

  return (
    <div className=" w-full flex justify-between  mb-5">
      <StepperButtons
        id={1}
        name="Today"
        date="Monday, 12 April"
        active={active == 1 ? true : false}
        image="//cdn.weatherapi.com/weather/128x128/day/116.png"
        onClick={handleClick}
      />
      <StepperButtons
        id={2}
        name="Tomorrow"
        date="Tuesday, 13 April"
        active={active == 2 ? true : false}
        image="//cdn.weatherapi.com/weather/128x128/day/176.png"
        onClick={handleClick}
      />

      <StepperButtons
        id={3}
        name="Wednesday"
        date="Wednesday, 14 April"
        active={active == 3 ? true : false}
        image="//cdn.weatherapi.com/weather/128x128/night/176.png"
        onClick={handleClick}
      />
    </div>
  );
};

const ForcastView = () => {
  return (
    <div className="w-3/5 mt-5">
      <Stepper />
      <Datacontainer />
    </div>
  );
};

export default ForcastView;
