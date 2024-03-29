import { React } from "react";
import { Link } from "react-router-dom";
import { useTokens } from "../contexts/UserContext";
import _ from "lodash";

import "../styles/Navbar.css";
const Navbar = (props) => {
  const { opacity, hamburger } = props;
  const { token, logOut } = useTokens();

  return (
    <nav
      className={`navbar ${opacity} navbar-expand-lg navbar-dark p-md-3 super-z`}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <div className="box">
            <h3 className="white text-center">m</h3>
          </div>
        </Link>
        {hamburger && (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </>
        )}

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="mx-auto"></div>
          <ul className="navbar-nav">
            {/* {!_.isEmpty(token) && (
              <li className="nav-item me-0">
                <Link to="/dashboard">
                  <button className="btn btn-outline-light">Dashboard</button>
                </Link>
              </li>
            )} */}
            {/* <li className="nav-item">
              <Link to="/contact">
                <button className="btn btn-outline-light">Contact</button>
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/about">
                <button className="btn btn-outline-light">About</button>
              </Link>
            </li> */}
            {_.isEmpty(token) ? (
              <li className="nav-item">
                <Link to="/Login">
                  <button className="btn btn-outline-light">Log In</button>
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/">
                  <button className="btn btn-outline-light" onClick={logOut}>
                    Log Out
                  </button>
                </Link>
              </li>
            )}
            {_.isEmpty(token) && (
              <li className="nav-item">
                <Link to="/Signup">
                  <button className="btn btn-outline-light">Sign Up</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
