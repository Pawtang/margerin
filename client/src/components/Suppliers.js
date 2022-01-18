import { React, Fragment } from "react";
import AppNav from "./AppNav";
import ResourceManager from "./ResourceManager";

const Suppliers = () => {
  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container">
        <div className="row">
          <AppNav></AppNav>
        </div>
      </div>
      <ResourceManager />
    </Fragment>
  );
};

export default Suppliers;
