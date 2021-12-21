import { React, Fragment } from "react";
import { Link } from "react-router-dom";

const AppNav = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg my-5">
        <div className="container-fluid d-flex">
          <div className="d-flex mx-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/dashboard">
                  <button className="btn btn-light">Dashboard</button>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/product">
                  <button className="btn btn-light">Products</button>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/material">
                  <button className="btn btn-light">Materials</button>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/suppliers">
                  <button className="btn btn-light">Suppliers</button>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/transactions">
                  <button className="btn btn-light">Transactions</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default AppNav;
