import { React, Fragment } from "react";
import { Link } from "react-router-dom";

const AppNav = () => {
  return (
    <div className="container-fluid d-flex my-5">
      <div className="btn-group mx-auto">
        <Link to="/dashboard">
          <button className="btn btn-light mx-1">Dashboard</button>
        </Link>

        <Link to="/product">
          <button className="btn btn-light mx-1">Products</button>
        </Link>

        <Link to="/material">
          <button className="btn btn-light mx-1">Materials</button>
        </Link>

        <Link to="/suppliers">
          <button className="btn btn-light mx-1">Suppliers</button>
        </Link>

        <Link to="/transactions">
          <button className="btn btn-light mx-1">Transactions</button>
        </Link>
      </div>
    </div>
  );
};

export default AppNav;
