import useLocalstorage from "../../hooks/useLocalstorage";

import { Method, App } from "../../models/app";
import { Location } from "../../models/location";

import Logo from "./logo";
import NavBar from "./navbar";
import Searchbar from "../../features/search/searchbar";

const Header = () => {
  const [storedValue] = useLocalstorage();

  const app: App = storedValue;
  const location: Location | null = app.location;

  const address = `${location?.name ? location?.name + ", " : ""}${
    location?.region ? location?.region + ", " : ""
  }${location?.country ? location?.country : ""}`;
  const fetchFrom =
    app.method === Method.FROMIPADDRESS
      ? "Based on your IP address."
      : `Based on your search.`;

  return (
    <div className="flex flex-col w-3/4">
      <div className="flex justify-between items-center w-full pt-12 pb-3 rounded border-secondary border-b-2">
        <Logo />
        <NavBar />
        <Searchbar />
      </div>
      <p className="text-right font-poppins font-light text-sm text-primary">
        {address} - {fetchFrom}
      </p>
    </div>
  );
};

export default Header;
