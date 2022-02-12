import { React, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ManagerSuppliers from "./components/ManagerSuppliers";
import ManagerMaterials from "./components/ManagerMaterials";
import ManagerTransactions from "./components/ManagerTransactions";
// import TransactionManager from "./components/TransactionManager";
import Navbar from "./components/Navbar";
import ToastManager from "./components/ToastManager";
import "./styles/main.css";
import "./styles/Styles.css";
import "./styles/AppPage.css";

const [toastState, setToastState] = useState("none");

ReactDOM.render(
  // <React.StrictMode>

  <BrowserRouter>
    <ToastManager toastState={toastState} />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="signup" element={<Signup setToastState={setToastState} />} />
      <Route path="login" element={<Login setToastState={setToastState} />} />
      <Route
        path="dashboard"
        element={<Dashboard setToastState={setToastState} />}
      />
      <Route
        path="suppliers"
        element={<ManagerSuppliers setToastState={setToastState} />}
      />
      <Route
        path="materials"
        element={<ManagerMaterials setToastState={setToastState} />}
      />
      <Route
        path="transactions"
        element={<ManagerTransactions setToastState={setToastState} />}
      />
    </Routes>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
