import { React } from "react";
import { Link } from "react-router-dom";

// import { useTokens } from "../contexts/UserContext";

const AppNav = () => {
  return (
    <>
      <div className="container ">
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <div className="container-fluid ">
            <div className="navbar-brand">{}</div>
            {/* <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="row">
              <div className="col-6 col-sm-3">
                <Link className="text-link" to="/dashboard">
                  Dashboard
                </Link>
              </div>
              <div className="col-6 col-sm-3">
                <Link className="text-link" to="/suppliers">
                  Suppliers
                </Link>
              </div>
              <div className="col-6 col-sm-3">
                <Link className="text-link" to="/materials">
                  Materials
                </Link>
              </div>
              <div className="col-6 col-sm-3">
                <Link className="text-link" to="/transactions">
                  Transactions
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AppNav;
