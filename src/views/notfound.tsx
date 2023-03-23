import home_icon from "../assets/home_icon.svg";

import { useNavigate } from "react-router-dom";

const NotfoundView = () => {
  const navigate = useNavigate();

  const onGoHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-playfair font-medium text-3xl text-primary">
          404 Not Found
        </h1>
        <button
          className="btn flex justify-center items-center"
          onClick={onGoHomeClick}
        >
          <img src={home_icon} alt="home_icon" className="w-8 h-8 pr-1" />
          Go to home
        </button>
      </div>
    </div>
  );
};

export default NotfoundView;
