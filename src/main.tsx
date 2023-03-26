import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import axios from "axios";

import { store } from "./app/store";
import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

axios.defaults.baseURL = "https://api.weatherapi.com/v1/";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
