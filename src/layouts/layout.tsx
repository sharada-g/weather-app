import { Suspense } from "react";

import { Outlet } from "react-router-dom";

import Header from "../components/header/header";

const SkeletionView = () => {
  const SkeletonElement = (
    <div className="w-full flex justify-between p-4">
      <div className="w-full">
        <div className="h-2.5 bg-secondary rounded-full w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-secondary rounded-full mb-4"></div>
        <div className="h-2.5 bg-secondary rounded-full w-96 mb-4"></div>
        <div className="h-2 bg-secondary rounded-full max-w-96 mb-2.5"></div>
        <div className="h-2 bg-secondary rounded-full mb-2.5"></div>
        <div className="h-2 bg-secondary rounded-full w-94 mb-2.5"></div>
      </div>
    </div>
  );

  return (
    <div className="w-3/5 mt-20 data-container rounded shadow animate-pulse">
      {Array(4).fill(SkeletonElement)}
    </div>
  );
};

const Layout = () => {
  return (
    <div className="flex flex-col items-center ">
      <Header />
      <Suspense fallback={<SkeletionView />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
