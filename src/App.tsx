import { lazy, useState, useCallback } from "react";
import { Outlet, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setMethod, setLocation } from "./features/app/appSlice";

import { useGetLocationsQuery } from "./features/search/searchSlice";

import useLocalstorage from "./hooks/useLocalstorage";

import { Method } from "./models/app";

import SearchView from "./views/search";

import Layout from "./layouts/layout";
const TodayView = lazy(() => import("./views/today"));
const HourlyView = lazy(() => import("./views/hourly"));
const ForcastView = lazy(() => import("./views/forcast"));

import NotfoundView from "./views/notfound";

const getIp = async () => {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  return data.ip;
};

const ProtectedRoute = () => {
  let content = null;
  const dispatch = useDispatch();

  const [storedValue] = useLocalstorage();

  const [ip, setIp] = useState<string>("");
  const [ipIsError, setIpIsError] = useState<boolean>(false);

  if (storedValue.method === Method.NONE) {
    getIp()
      .then((ip) => {
        setIp(ip);
      })
      .catch((err) => {
        setIpIsError(true);
      });
  }

  const { data, isSuccess, isLoading, isFetching, isError } =
    useGetLocationsQuery(ip, {
      skip: ip === "" || storedValue.method !== Method.NONE,
    });

  if (isSuccess && data) {
    console.log(data);
    dispatch(setMethod(Method.FROMIPADDRESS));
    dispatch(setLocation(data[0]));
  }

  if (storedValue.method !== Method.NONE) content = <Outlet />;
  else if (ipIsError || isError) content = <SearchView />;

  return content;
};

function App() {
  return (
    <main className="bg-background w-full h-auto min-h-screen">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<TodayView />} />
            <Route path="hourly" element={<HourlyView />} />
            <Route path="forcast" element={<ForcastView />} />
          </Route>
        </Route>

        <Route path="*" element={<NotfoundView />} />
      </Routes>
    </main>
  );
}

export default App;
