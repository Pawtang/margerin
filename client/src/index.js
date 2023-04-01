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
import ToastManager from "./components/ToastManager";
import { ToastProvider } from "./contexts/ToastContext";
import { UserProvider } from "./contexts/UserContext";
import "./styles/main.css";
import "./styles/Styles.css";
import "./styles/AppPage.css";

const App = () => {
  return (
    <>
      <ToastManager />
      {/* <ToastManager toastStack={toastStack} /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="suppliers" element={<ManagerSuppliers />} />
        <Route path="materials" element={<ManagerMaterials />} />
        <Route path="transactions" element={<ManagerTransactions />} />
      </Routes>
    </>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <ToastProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ToastProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
