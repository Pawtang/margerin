import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useToasts } from "../contexts/ToastContext";

import _ from "lodash";

const Login = () => {
  const URL_SERVER = "http://localhost:5000";
  const { addToast } = useToasts();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUser = async () => {
    try {
      const response = await fetch(`${URL_SERVER}/login`);
      if (!response.ok) {
        const res = response.json();
        throw new Error(res.message);
      }
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.error(error);
      addToast({
        title: " Database Error",
        type: "Error",
        body: "Login failed",
      });
    }
  };

  return (
    <Fragment>
      <Navbar opacity={"nav-opaque"} />
      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white p-5 justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12">
            <h1>Log In</h1>

            <div class="mb-3">
              <label for="email" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input type="password" class="form-control" id="password" />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-center">
              <button class="btn btn-primary">Log In</button>
              <Link to="/Signup">
                <button class="btn btn-outline-primary">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
