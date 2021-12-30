import { React, Fragment } from "react";
import AppNav from "./AppNav";

const Transactions = () => {
  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container">
        <div className="row">
          <AppNav></AppNav>
        </div>
        <div className="app-space">
          <h1>Transactions</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default Transactions;
