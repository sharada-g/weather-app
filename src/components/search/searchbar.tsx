import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";

import useDebounce from "../../hooks/useDebounce";

import { setMethod, setLocation } from "../../slices/appSlice";

import { IApiStatus, ILocation } from "../../models/location";
import {
  fetchSearch,
  selectSearchData,
  selectSearchStatus,
} from "../../slices/searchSlice";

import { fetchWeather } from "../../slices/weatherSlice";

import search_icon from "../../assets/search_icon.svg";
import close_icon from "../../assets/close_icon.svg";
import { Method } from "../../models/app";

type ResultItemProps = {
  item: ILocation;
  onClearSearch: () => void;
};

const ResultItem = ({ item, onClearSearch }: ResultItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // when result item is clicked event handler
  const onResultSelect = () => {
    // update app state
    dispatch(setMethod(Method.FROMSEARCH));
    dispatch(setLocation(item));
    dispatch(fetchWeather(item.url));

    // clear search value
    onClearSearch();
  };

  const resultName = item.name + ", " + item.region + ", " + item.country;

  return (
    <button
      className="w-78 px-2 mt-1 flex gap-1 justify-start items-start hover:underline text-left shadow-sm"
      onClick={onResultSelect}
    >
      <img src={search_icon} alt="search_icon" className="w-6 h-6" />
      <p className="text-secondary font-poppins font-extralight text-xs">
        {resultName}
      </p>
    </button>
  );
};

const Searchbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector(selectSearchData);
  const status = useSelector(selectSearchStatus);

  const [searchValue, setSearchValue] = useState<string>("");
  const [result, setResult] = useState<ILocation[]>([]);

  // event handler for search input
  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  // debounce the search value
  const debouncedSearchValue: string = useDebounce({
    value: searchValue,
    delay: 500,
  });

  // update result when search value changes
  useEffect(() => {
    if (debouncedSearchValue !== "" && status != IApiStatus.Loading) {
      dispatch(fetchSearch(debouncedSearchValue));
    }
  }, [debouncedSearchValue, dispatch]);

  useEffect(() => {
    if (status == IApiStatus.Succeeded && debouncedSearchValue !== "") {
      setResult(data);
    }
    if (debouncedSearchValue === "" || status == IApiStatus.Failed) {
      setResult([]);
    }
  }, [status, dispatch, debouncedSearchValue, data]);

  // clear search input when close icon is clicked
  const onClearSearch = () => {
    setSearchValue("");
    setResult([]);
  };

  // ui data
  const closeBtn =
    result?.length > 0 ? (
      <button className="w-8 h-8 " onClick={onClearSearch}>
        <img src={close_icon} alt="close_icon" className="w-8 h-8" />
      </button>
    ) : null;

  const resultContainer =
    result?.length > 0 ? (
      <div className="max-h-48 absolute top-10 mt-[-4px] left-0 w-80 h-fit bg-white border-secondary border-2 border-t-0 rounded-b-md shadow-lg py-2 flex flex-col gap-2 overflow-scroll overflow-x-hidden">
        {result.map((item: ILocation, index) => (
          <ResultItem key={item.id} item={item} onClearSearch={onClearSearch} />
        ))}
      </div>
    ) : null;

  return (
    <div className="relative">
      <div className="w-80 h-10 px-2 border-secondary border-2 rounded-md bg-white flex gap-2 align-middle justify-between  force-within:shadow-lg force-within:shadow-black">
        <img src={search_icon} alt="search_icon" className="w-8 h-8 " />
        <input
          type="text"
          value={searchValue || ""}
          placeholder="Search City or Postcode"
          className="w-full h-8 bg-transparent border-none outline-none text-left font-poppins font-normal placeholder:text-center"
          onChange={onSearchInputChange}
        />
        {closeBtn}
      </div>
      {resultContainer}
    </div>
  );
};

export default Searchbar;
