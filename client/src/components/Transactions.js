import { React, Fragment } from "react";
import AppNav from "./AppNav";

const Transactions = () => {
  const clearEntry = () => {};

  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container-xxl">
        <div className="row">
          <AppNav></AppNav>
        </div>
        <div className="row shadow rounded-3 bg-white">
          <h1>Transaction Manager</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default Transactions;
