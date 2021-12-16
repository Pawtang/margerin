import React, { Fragment } from "react";
import "../styles/App.css";
import Navbar from "./Navbar";

//components

function Login() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <p>Login goes here</p>
      </div>
    </Fragment>
  );
}

export default Login;
