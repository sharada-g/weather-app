import Datacontainer from "../features/weather/weatherContainer";
import { useDispatch } from "react-redux";

import { setDay } from "../features/app/appSlice";
import { Days } from "../models/app";

const Today = () => {
  const dispatch = useDispatch();

  dispatch(setDay(Days.TODAY));
  return (
    <div className="m-4 xl:w-3/5 lg:mt-20">
      <Datacontainer />
    </div>
  );
};

export default Today;
