import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark p-md-3">
      <div className="container">
        <Link to="/" class="navbar-brand">
          <img src="./assets/margerin.png" alt="" width="30px" height="30px" />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="mx-auto"></div>
          <ul className="navbar-nav">
            <li className="nav-item me-0">
              <Link to="/dashboard">
                <button className="btn btn-outline-light">Dashboard</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact">
                <button className="btn btn-outline-light">Contact</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about">
                <button className="btn btn-outline-light">About</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Login">
                <button className="btn btn-outline-light">Log In</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Signup">
                <button className="btn btn-outline-light">Sign Up</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
