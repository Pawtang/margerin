import React, { Fragment } from "react";
import "./App.css";

//components

function App() {
  return (
    <Fragment>
      <div className="container-fluid background">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-auto">
              <button className="btn btn-light pull-right">Log In</button>
            </div>
            <div className="col-auto">
              <button className="btn btn-outline-light pull-right">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="container titlebox">
          <h1>margerin</h1>
          <p className="white">Take the guesswork out of product costing</p>
          <button className="btn btn-outline-light">Try a Demo</button>
        </div>
      </div>
      <div className="container content">
        <h2>Lightweight and Affordable Tool for Small Businesses</h2>
      </div>
    </Fragment>
  );
}

export default App;
