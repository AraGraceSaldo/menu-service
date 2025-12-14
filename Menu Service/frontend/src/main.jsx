import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />

      {/* <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}

      {/* <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="menu">
          <Route index element={<MenuHome />} /> 
          <Route path=":item" element={<MenuItem />} />
        </Route>
      </Route> */}
    </Routes>
  </BrowserRouter>,
);

