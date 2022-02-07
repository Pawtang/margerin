import { React, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import "../styles/Styles.css";
import "../styles/main.css";

const Landing = () => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <div className="container-fluid background">
        {/* <div className="blurry"></div> */}
        {/* <nav className="navbar bg-transparent">
          <div className="container justify-content-end mt-4">
            <button className="btn btn-light me-md-2" type="button">
              Log In
            </button>
            <button className="btn btn-outline-light" type="button">
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
        <div className="row shadow rounded-3 my-5 bg-white">
          <div className="col-3 bg-white text-center p-3">
            <i className="bi bi-clipboard-data big-icon"></i>
            <p className="text-center">Record material cost data</p>
          </div>
          <div className="col-9 my-auto p-4">
            <p>
              As you record material purchase transaction data, Margerin shows
              you the effects of changing costs from your suppliers over time on
              your profit margins.
            </p>
          </div>
        </div>
        <div className="row shadow rounded my-5 bg-white">
          <div className="col-3 bg-white text-center p-3">
            <i className="bi bi-calculator big-icon"></i>
            <p className="text-center">
              Automatically calculate cost of goods sold
            </p>
          </div>
          <div className="col-9 my-auto p-4">
            <p>
              Margerin aggregates previous transactions and gives you the best
              estimate of current real cost to produce a product or assembly.
            </p>
          </div>
        </div>
        <div className="row shadow rounded my-5 bg-white">
          <div className="col-3 bg-white text-center p-3">
            <i className="bi bi-cash-coin big-icon"></i>
            <p className="text-center">Set prices with confidence</p>
          </div>
          <div className="col-9 my-auto p-4">
            <p>
              Margerin helps you determine where your costs should be to
              maintain profitability and set smart prices for different sales
              channels.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
