import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">
            margerin
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link>
                  <button className="btn btn-light">Demo</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link>
                  <button className="btn btn-light">Log In</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link>
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
