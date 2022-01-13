import { React } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Material from "./components/Material";
import Dashboard from "./components/Dashboard";
import Suppliers from "./components/Suppliers";
import Transactions from "./components/Transactions";
import Navbar from "./components/Navbar";
import "./styles/main.css";
import "./styles/Styles.css";
import "./styles/AppPage.css";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

ReactDOM.render(
  // <React.StrictMode>

  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />

      <Route path="material" element={<Material />} />
      <Route path="suppliers" element={<Suppliers />} />
      <Route path="transactions" element={<Transactions />} />
    </Routes>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
