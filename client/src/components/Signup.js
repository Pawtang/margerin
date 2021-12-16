import React, { Fragment } from "react";
import "../styles/App.css";
import Navbar from "./Navbar";

//components

function Signup() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <p>Signup goes here</p>
      </div>
    </Fragment>
  );
}

export default Signup;
