import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MainPage } from "./Pages/mainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginPage } from "./Pages/loginPage";
import { RegisterPage } from "./Pages/registerPage";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
