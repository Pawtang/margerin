import { React } from "react";
import { Link } from "react-router-dom";

const AppNav = () => {
  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Resource Manager
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div>
              <div className="d-flex">
                <div className="">
                  <Link className="text-link" to="/dashboard">
                    Dashboard
                  </Link>
                </div>
                <div className="">
                  <Link className="text-link" to="/suppliers">
                    Suppliers
                  </Link>
                </div>
                <div className="">
                  <Link className="text-link" to="/transactions">
                    Transactions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AppNav;
