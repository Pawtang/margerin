import { React } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Product from "./components/Product";
import Material from "./components/Material";
import Dashboard from "./components/Dashboard";
import Suppliers from "./components/Suppliers";
import Transactions from "./components/Transactions";
import Navbar from "./components/Navbar";
import "./styles/Styles.css";
import "./styles/AppPage.css";

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
      <Route path="product" element={<Product />} />
      <Route path="material" element={<Material />} />
      <Route path="suppliers" element={<Suppliers />} />
      <Route path="transactions" element={<Transactions />} />
    </Routes>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
