import { lazy } from "react";

import { Routes, Route } from "react-router-dom";
import useProtectedRoutes from "./hooks/useProtectedRoutes";

import Layout from "./layouts/layout";
const TodayView = lazy(() => import("./views/today"));
const HourlyView = lazy(() => import("./views/hourly"));
const ForcastView = lazy(() => import("./views/forcast"));

import NotfoundView from "./views/notfound";

const ProtectedRoute = () => {};

function App() {
  const ProtectedRoute = useProtectedRoutes();

  return (
    <main className="bg-background h-full min-h-screen ">
      <Routes>
        <Route element={ProtectedRoute}>
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
