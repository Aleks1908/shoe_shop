import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MainPage } from "./Pages/mainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./Pages/registerPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
