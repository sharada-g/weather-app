import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate, useLocation } from "react-router-dom";

import refresh_icon from "../../assets/refresh_icon.svg";

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div className="data-container">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <p className="font-poppins font-normal text-lg text-primary">
          Something went wrong
        </p>
        <p className="font-poppins font-light text-xs text-primary break-words text-justify leading-10">
          {error.message}
        </p>

        <button
          className="btn flex justify-center items-center"
          onClick={resetErrorBoundary}
        >
          <img src={refresh_icon} alt="weather_icon" className="w-8 h-8 pr-1" />
          Try again
        </button>
      </div>
    </div>
  );
};

const SkeletonCard = () => {
  const SkeletonElement = (
    <div className="h-full w-full flex justify-between p-4 ">
      <div>
        <div className="w-24 h-2.5 bg-secondary rounded-full mb-2.5"></div>
        <div className="w-32 h-2 bg-secondary rounded-full"></div>
      </div>
      <div className=" w-12 h-2.5 bg-secondary rounded-full"></div>
    </div>
  );

  return (
    <div className="data-container w-full  rounded shadow animate-pulse">
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <div key={index}>{SkeletonElement}</div>
        ))}
    </div>
  );
};

type CardcontainerProps = {
  children: React.ReactNode;
};

const Cardcontainer = ({ children }: CardcontainerProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        navigate(location.pathname);
      }}
    >
      <Suspense fallback={<SkeletonCard />}>
        <article className="data-container">{children}</article>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Cardcontainer;
