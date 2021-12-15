import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import App from "./components/App";
import Login from "./components/Login";
import Signup from "./components/Signup";

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="app" element={<App />} />
      {/* <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} /> */}
    </Routes>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
