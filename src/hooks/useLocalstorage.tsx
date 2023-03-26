import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setMethod, setLocation } from "../slices/appSlice";
import { IApp, Method } from "../models/app";

const useLocalstorage = () => {
  const dispatch = useDispatch();
  const key = "weather_app";

  const appData = useSelector((state: any) => state.app);

  const [storedValue, setStoredValue] = useState<IApp>(() => {
    try {
      const item = window.localStorage.getItem(key);
      const data = item ? JSON.parse(item) : appData;

      dispatch(setMethod(data.method));
      dispatch(setLocation(data.location));

      return data;
    } catch (error) {
      return null;
    }
  });

  const setValue = (value: IApp) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (appData.method !== Method.NONE) setValue(appData);
  }, [appData]);

  return [storedValue, setValue] as const;
};

export default useLocalstorage;
