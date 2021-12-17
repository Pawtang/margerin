import React, { Fragment } from "react";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../styles/App.css";

//components

function App() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <p>App goes here</p>
      </div>
    </Fragment>
  );
}

export default App;
