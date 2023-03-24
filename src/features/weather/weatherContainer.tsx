import useGetWeather from "../../hooks/useGetweather";

import Cardcontainer from "../../components/cards/cardcontainer";

import Herocard from "../../components/cards/hero";
import Forcastcard from "../../components/cards/forcast";
import Astrocard from "../../components/cards/astro";
import DetailCard from "../../components/cards/details";
import DaytimeCard from "../../components/cards/daytime";

const Datacontainer = () => {
  const [data] = useGetWeather();

  const title = data
    ? `Weather ${data?.title.name} in ${
        data?.title.location.name +
        ", " +
        data?.title.location.region +
        ", " +
        data?.title.location.country
      } `
    : "";

  return (
    <div className="grid lg:grid-cols-2 gap-2 lg:gap-4">
      <div className="lg:col-span-2">
        <h1 className="font-playfair font-medium text-xl md:text-3xl text-primary text-left">
          {title}
        </h1>
        <h2 className="font-poppins font-light text-sm text-secondary text-left">
          As of {data?.title.fetchTime}
        </h2>
      </div>
      <div>
        <Cardcontainer>
          <Herocard data={data?.hero} />
        </Cardcontainer>
      </div>
      <div>
        <Cardcontainer>
          <Forcastcard data={data?.forcast} />
        </Cardcontainer>
      </div>
      <div>
        <Cardcontainer>
          <Astrocard data={data?.astro} />
        </Cardcontainer>
      </div>
      <div className="lg:row-start-2 lg:col-start-2 lg:row-span-2">
        <Cardcontainer>
          <DetailCard data={data?.details} />
        </Cardcontainer>
      </div>
      <div>
        <Cardcontainer>
          <DaytimeCard data={data?.day} />
        </Cardcontainer>
      </div>
    </div>
  );
};

export default Datacontainer;
