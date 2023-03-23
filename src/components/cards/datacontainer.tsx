import Cardcontainer from "./cardcontainer";

import Herocard from "./hero";
import Forcastcard from "./forcast";
import Astrocard from "./astro";
import DetailCard from "./details";
import DaytimeCard from "./daytime";

const Datacontainer = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <h1 className="font-playfair font-medium text-3xl text-primary text-left">
          Weather Today in Hobart, Tasmania, Australia
        </h1>
        <h2 className="font-poppins font-light text-sm text-secondary text-left">
          As of 2023-03-20 18:19
        </h2>
      </div>
      <div>
        <Cardcontainer>
          <Herocard />
        </Cardcontainer>
      </div>
      <div>
        <Cardcontainer>
          <Forcastcard />
        </Cardcontainer>
      </div>
      <div>
        <Cardcontainer>
          <Astrocard />
        </Cardcontainer>
      </div>
      <div className="row-start-2 col-start-2 row-span-2">
        <Cardcontainer>
          <DetailCard />
        </Cardcontainer>
      </div>
      <div>
        <Cardcontainer>
          <DaytimeCard />
        </Cardcontainer>
      </div>
    </div>
  );
};

export default Datacontainer;
