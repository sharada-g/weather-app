import Logo from "./logo";
import NavBar from "./navbar";
import Searchbar from "./searchbar";

const Header = () => {
  return (
    <div className="flex flex-col w-3/4">
      <div className="flex justify-between items-center w-full pt-12 pb-3 rounded border-secondary border-b-2">
        <Logo />
        <NavBar />
        <Searchbar />
      </div>
      <p className="text-right font-poppins font-light text-sm text-primary">
        Hobart, Tasmania, Australia - Based on your IP address.
      </p>
    </div>
  );
};

export default Header;
