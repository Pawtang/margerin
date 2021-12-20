import React from "react";

const AppNav = () => {
  return (
    <div className="container">
      <Fragment>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid d-flex align-items-center">
            <div className="collapse navbar-collapse d-flex align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/dashboard">
                    <button className="btn btn-light">Dashboard</button>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/product">
                    <button className="btn btn-light">Log In</button>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/material">
                    <button className="btn btn-light">Material Manager</button>
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
    </div>
  );
};

export default AppNav;
