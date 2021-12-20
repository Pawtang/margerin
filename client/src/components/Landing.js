import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";
import Navbar from "./Navbar";

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          molestie in sapien id pretium. Aenean et varius augue. Sed varius sem
          a metus ultrices varius. Donec egestas mauris ut ligula vestibulum
          euismod quis eget lectus. Quisque ullamcorper, diam non mattis.
        </p>
        <div className="row text-center justify-content-between">
          <div className="col-3 shadow rounded my-5">
            <i class="bi bi-clipboard-data big-icon"></i>
            <p className="text-center">Record recipe data</p>
          </div>
          <div className="col-3 shadow rounded my-5">
            <i class="bi bi-calculator big-icon"></i>
            <p className="text-center">Automatically calculate cost of goods</p>
          </div>
          <div className="col-3 shadow rounded my-5">
            <i class="bi bi-cash-coin big-icon"></i>
            <p className="text-center">Set prices with confidence</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
