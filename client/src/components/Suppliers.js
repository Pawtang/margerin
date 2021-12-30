import { React, Fragment } from "react";
import AppNav from "./AppNav";

const Suppliers = () => {
  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container">
        <div className="row">
          <AppNav></AppNav>
        </div>
        <div className="app-space">
          <h1>Suppliers</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default Suppliers;
