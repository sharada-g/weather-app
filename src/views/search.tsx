import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/header/logo";
import Searchbar from "../components/search/searchbar";
import { IApp, Method } from "../models/app";

type SearchViewProps = {
  storedValue: IApp;
};

const SearchView = ({ storedValue }: SearchViewProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  useEffect(() => {
    if (
      storedValue?.method !== Method.NONE &&
      location.pathname === "/search"
    ) {
      navigate("/");
    }
  }, [storedValue?.method, location.pathname, navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-start md:items-center mt-10 md:mt-0">
      <div className="flex flex-col items-center gap-2">
        <Logo />
        <Searchbar />
      </div>
    </div>
  );
};

export default SearchView;
