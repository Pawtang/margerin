import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/Styles.css";

const Landing = () => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <div className="container-fluid background">
        {/* <div className="blurry"></div> */}
        {/* <nav className="navbar bg-transparent">
          <div className="container justify-content-end mt-4">
            <button class="btn btn-light me-md-2" type="button">
              Log In
            </button>
            <button class="btn btn-outline-light" type="button">
              Sign Up
            </button>
          </div>
        </nav> */}

        <div className="container-fluid d-flex align-items-center hero">
          <div className="container titlebox">
            <h1 className="title">margerin</h1>
            <h1 className="white display-6">
              Take the guesswork out of product costing
            </h1>
            <Link to="dashboard">
              <button className="btn btn-lg btn-outline-light mt-2">
                Try a Demo
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container content">
        <h2>Lightweight and Affordable Tool for Small Businesses</h2>
        <p>
          <br />
          Margerin is a featherweight ERP platform designed to track the cost of
          materials from your various suppliers over time. With predictive
          analytics, you can have a clearer idea of how much your products cost
          to make, and what your real profit margins are.
        </p>
        <div className="row text-center justify-content-between">
          <div className="col-3 shadow rounded my-5 bg-white">
            <i class="bi bi-clipboard-data big-icon"></i>
            <p className="text-center">Record material cost data</p>
          </div>
          <div className="col-3 shadow rounded my-5 bg-white">
            <i class="bi bi-calculator big-icon"></i>
            <p className="text-center">
              Automatically calculate cost of goods sold
            </p>
          </div>
          <div className="col-3 shadow rounded my-5 bg-white">
            <i class="bi bi-cash-coin big-icon"></i>
            <p className="text-center">Set prices with confidence</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
