import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex align-items-center">
          <Link to="/">
            <p className="navbar-brand">margerin</p>
          </Link>
          <div className="collapse navbar-collapse d-flex align-items-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/app">
                  <button className="btn btn-light">Demo</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Login">
                  <button className="btn btn-light">Log In</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Signup">
                  <button className="btn btn-light">Sign Up</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
