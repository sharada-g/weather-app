import { lazy } from "react";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./layouts/ProtectedRoutes";

import Layout from "./layouts/layout";
const TodayView = lazy(() => import("./views/today"));
const HourlyView = lazy(() => import("./views/hourly"));
const ForcastView = lazy(() => import("./views/forcast"));

import SearchView from "./views/search";
import NotfoundView from "./views/notfound";
import useLocalstorage from "./hooks/useLocalstorage";

function App() {
  const [storedValue] = useLocalstorage();
  return (
    <main className="bg-background h-full min-h-screen ">
      <Routes>
        <Route element={<ProtectedRoute storedValue={storedValue} />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<TodayView />} />
            <Route path="hourly" element={<HourlyView />} />
            <Route path="forcast" element={<ForcastView />} />
          </Route>
        </Route>

        <Route
          path="search"
          element={<SearchView storedValue={storedValue} />}
        />

        <Route path="*" element={<NotfoundView />} />
      </Routes>
    </main>
  );
}

export default App;
