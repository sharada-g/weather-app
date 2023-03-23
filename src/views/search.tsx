import React from "react";
import Logo from "../components/header/logo";
import Searchbar from "../components/header/searchbar";

const SearchView = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <Logo />
        <Searchbar />
      </div>
    </div>
  );
};

export default SearchView;
