import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setMethod, setLocation } from "../slices/appSlice";

import useLocalstorage from "../hooks/useLocalstorage";

import { Method } from "../models/app";

import SearchView from "../views/search";
import {
  fetchSearch,
  selectSearchData,
  selectSearchStatus,
} from "../slices/searchSlice";
import { IApiStatus } from "../models/location";

const getIp = async () => {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  return data.ip;
};

const useProtectedRoutes = () => {
  let content = <SearchView />;

  const dispatch = useDispatch();

  const [storedValue] = useLocalstorage();

  const [ip, setIp] = useState<string>("");
  const [ipIsError, setIpIsError] = useState<boolean>(false);

  const data = useSelector(selectSearchData);
  const status = useSelector(selectSearchStatus);

  if (storedValue.method === Method.NONE) {
    getIp()
      .then((ip) => {
        setIp(ip);
      })
      .catch((err) => {
        setIpIsError(true);
      });
  } else content = <Outlet />;

  useEffect(() => {
    if (ip && storedValue.method === Method.NONE) {
      dispatch(fetchSearch(ip));
    }
  }, [ip, dispatch, storedValue.method]);

  useEffect(() => {
    if (
      !ipIsError &&
      status === IApiStatus.Succeeded &&
      data.length > 0 &&
      storedValue.method === Method.NONE
    ) {
      dispatch(setMethod(Method.FROMIPADDRESS));
      dispatch(setLocation(data[0]));
      content = <Outlet />;
    }
  }, [status, data, dispatch]);

  return content;
};

export default useProtectedRoutes;
