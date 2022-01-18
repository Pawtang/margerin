import { React } from "react";
import { Link } from "react-router-dom";

const AppNav = () => {
  return (
    <div class="row">
      <Link to="/dashboard">
        <button className="btn btn-outline-dark">Dashboard</button>
      </Link>

      <Link to="/suppliers">
        <button className="btn btn-outline-dark">Suppliers</button>
      </Link>

      <Link to="/transactions">
        <button className="btn btn-outline-dark">Transactions</button>
      </Link>
    </div>
  );
};

export default AppNav;
