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
import "./styles/main.css";
import "./styles/Styles.css";
import "./styles/AppPage.css";

const App = () => {
  const [toastStack, setToastStack] = useState([
    {
      title: "Tester",
      type: "test toast",
      body: "This is just a test toast, baby",
    },
  ]);

  const pushToStack = (toast) => {
    setToastStack((toastStack) => toastStack.push(toast));
    setTimeout(() => {
      setToastStack((toastStack) => toastStack.shift());
    }, 3000);
  };

  return (
    <>
      <ToastManager toastStack={toastStack} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Signup pushToStack={pushToStack} />} />
        <Route path="login" element={<Login pushToStack={pushToStack} />} />
        <Route
          path="dashboard"
          element={<Dashboard pushToStack={pushToStack} />}
        />
        <Route
          path="suppliers"
          element={<ManagerSuppliers pushToStack={pushToStack} />}
        />
        <Route
          path="materials"
          element={<ManagerMaterials pushToStack={pushToStack} />}
        />
        <Route
          path="transactions"
          element={<ManagerTransactions pushToStack={pushToStack} />}
        />
      </Routes>
    </>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
