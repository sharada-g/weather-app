import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";

import { setLocation, setMethod } from "../slices/appSlice";
import { IApp, Method } from "../models/app";

import { fetchIp, selectIpData, selectIpStatus } from "../slices/ipSlice";
import { IApiStatus as IApiStatusIp } from "../models/ip";

import {
  fetchSearch,
  selectSearchData,
  selectSearchStatus,
} from "../slices/searchSlice";
import { IApiStatus as IApiStatusSearch } from "../models/location";

type ProtectedRoutesProps = {
  storedValue: IApp;
};

const ProtectedRoutes = ({ storedValue }: ProtectedRoutesProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let content = <Outlet />;

  const ipStatus = useSelector(selectIpStatus);
  const ipData = useSelector(selectIpData);
  const searchStatus = useSelector(selectSearchStatus);
  const searchData = useSelector(selectSearchData);

  useEffect(() => {
    if (storedValue.method === Method.NONE) {
      if (ipStatus === IApiStatusIp.Idle) {
        dispatch(fetchIp());
      } else if (ipStatus === IApiStatusIp.Succeeded) {
        if (searchStatus === IApiStatusSearch.Idle) {
          dispatch(fetchSearch(ipData));
        } else if (searchStatus === IApiStatusSearch.Succeeded) {
          if (searchData.length > 0) {
            dispatch(setMethod(Method.FROMIPADDRESS));
            dispatch(setLocation(searchData[0]));
          } else navigate("/search");
        } else if (searchStatus === IApiStatusSearch.Failed) {
          navigate("/search");
        }
      } else if (ipStatus === IApiStatusIp.Failed) {
        navigate("/search");
      }
    }
  }, [storedValue.method, ipStatus, searchStatus]);

  return content;
};

export default ProtectedRoutes;
