import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

import { selectLocation } from "../slices/appSlice";

import { fetchWeather, selectWeatherStatus } from "../slices/weatherSlice";

import { IApiStatus } from "../models/weather";

import Header from "../components/header/header";

const SkeletionView = () => {
  const SkeletonElement = (
    <div className="w-full flex justify-between p-4">
      <div className="w-full">
        <div className="h-2.5 bg-secondary rounded-full w-24 mb-2.5"></div>
        <div className="w-11/12 h-2 bg-secondary rounded-full mb-4"></div>
        <div className="h-2.5 bg-secondary rounded-full w-96 mb-4"></div>
        <div className="h-2 bg-secondary rounded-full max-w-96 mb-2.5"></div>
        <div className="h-2 bg-secondary rounded-full mb-2.5"></div>
        <div className="h-2 bg-secondary rounded-full w-94 mb-2.5"></div>
      </div>
    </div>
  );

  return (
    <div className="m-4 w-11/12 md:w-5/6 lg:w-9/12 xl:w-3/5 lg:mt-20 data-container rounded shadow animate-pulse">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div key={index}>{SkeletonElement}</div>
        ))}
    </div>
  );
};

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const location = useSelector(selectLocation);
  const city = location?.url;

  const status = useSelector(selectWeatherStatus);

  useEffect(() => {
    if (status == IApiStatus.Idle && city) {
      dispatch(fetchWeather(city));
    }
  }, [status, dispatch, location, city]);

  return (
    <div className="flex flex-col items-center mb-10">
      <Header />
      <Suspense fallback={<SkeletionView />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
