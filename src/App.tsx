import { lazy } from "react";

import { useLocation, Navigate, Outlet, Routes, Route } from "react-router-dom";

import SearchView from "./views/search";

import Layout from "./layouts/layout";
const TodayView = lazy(() => import("./views/today"));
const HourlyView = lazy(() => import("./views/hourly"));
const ForcastView = lazy(() => import("./views/forcast"));

import NotfoundView from "./views/notfound";

const ProtectedRoute = () => {
  const location = useLocation();

  const hasLocation = true;

  return hasLocation ? (
    <Outlet />
  ) : (
    <Navigate to="/search" state={{ from: location }} replace />
  );
};

function App() {
  return (
    <main className="bg-background w-full h-auto min-h-screen">
      <Routes>
        <Route path="search" element={<SearchView />} />

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
