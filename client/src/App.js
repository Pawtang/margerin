import React, { Fragment } from "react";
import "./App.css";

//components

function App() {
  return (
    <Fragment>
      <div className="container-fluid background">
        <div className="container">
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
