import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useToasts } from "../contexts/ToastContext";
import { useTokens } from "../contexts/UserContext";

import _ from "lodash";

const Login = () => {
  const URL_SERVER = "http://localhost:5000";
  const { addToast } = useToasts();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken, setUser } = useTokens();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const validateUser = async (body) => {
    try {
      const response = await fetch(`${URL_SERVER}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res);
      }
      const res = await response.json();
      console.log("login res", res);
      setToken(res.accessToken);
      // setUser(res.user);
      clearInputs();
      addToast({
        title: " Success",
        type: "Success",
        body: "Login successful",
      });
    } catch (error) {
      console.error("Custom error", error);
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const body = { email, password };
      await validateUser(body);
    } catch (error) {}
  };

  return (
    <Fragment>
      <Navbar opacity={"nav-opaque"} />
      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white p-5 justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12">
            <h1>Log In</h1>

            <form
              action=""
              onSubmit={(e) => {
                handleLogin(e);
              }}
            >
              <div className="mb-3">
                <label htmlFor="email" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-center">
                <button class="btn btn-primary">Log In</button>
                <Link to="/Signup">
                  <button class="btn btn-outline-primary">Sign Up</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
