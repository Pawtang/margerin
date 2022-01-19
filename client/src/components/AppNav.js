import { React } from "react";
import { Link } from "react-router-dom";

const AppNav = () => {
  return (
    <div className="row">
      <div className="col-4">
        <Link to="/dashboard">
          <div className="d-grid gap-2">
            <button className="btn btn-outline-dark">Dashboard</button>
          </div>
        </Link>
      </div>

      <div className="col-4">
        <Link to="/suppliers">
          <div className="d-grid gap-2">
            <button className="btn btn-outline-dark">Suppliers</button>
          </div>
        </Link>
      </div>
      <div className="col-4">
        <Link to="/transactions">
          <div className="d-grid gap-2">
            <button className="btn btn-outline-dark">Transactions</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AppNav;
