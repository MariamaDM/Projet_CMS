import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/dashboard/Dashboard";
import Transactions from "./pages/Transactions";
import Subscriptions from "./pages/Subscriptions";
import Claims from "./pages/Claims";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="claims" element={<Claims />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);