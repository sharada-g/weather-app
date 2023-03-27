import useLocalstorage from "../../hooks/useLocalstorage";

import { Method, IApp } from "../../models/app";
import { ILocation } from "../../models/location";

import Logo from "./logo";
import NavBar from "./navbar";
import Searchbar from "../search/searchbar";

const Header = () => {
  const [storedValue] = useLocalstorage();

  const app: IApp = storedValue;
  const location: ILocation | null = app.location;

  const address = `${location?.name ? location?.name + ", " : ""}${
    location?.region ? location?.region + ", " : ""
  }${location?.country ? location?.country : ""}`;
  const fetchFrom =
    app.method === Method.FROMIPADDRESS
      ? "Based on your IP address."
      : `Based on your search.`;

  return (
    <div className="flex flex-col w-full m-4 lg:m-1  lg:w-5/6 xl:w-3/4">
      <div className="flex flex-col lg:flex-row justify-evenly lg:justify-between items-center w-full lg:pt-12 pb-3 gap-2 rounded border-secondary border-b-2">
        <Logo />
        <NavBar />
        <Searchbar />
      </div>
      <p className="mt-4 text-center md:text-right font-poppins font-light text-xs md:text-sm text-primary">
        {address} - {fetchFrom}
      </p>
    </div>
  );
};

export default Header;
