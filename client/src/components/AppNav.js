import { React } from "react";
import { Link } from "react-router-dom";

const AppNav = () => {
  return (
    <div className="container-fluid d-flex my-5">
      <div className="btn-group mx-auto ">
        <Link to="/dashboard">
          <button className="btn btn-outline-dark">Dashboard</button>
        </Link>

        <Link to="/product">
          <button className="btn btn-outline-dark">Products</button>
        </Link>

        <Link to="/material">
          <button className="btn btn-outline-dark">Materials</button>
        </Link>

        <Link to="/suppliers">
          <button className="btn btn-outline-dark">Suppliers</button>
        </Link>

        <Link to="/transactions">
          <button className="btn btn-outline-dark">Transactions</button>
        </Link>
      </div>
    </div>
  );
};

export default AppNav;
