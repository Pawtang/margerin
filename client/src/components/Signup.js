import { React, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useToasts } from "../contexts/ToastContext";

function Signup() {
  const URL_SERVER = "http://localhost:5000";
  const { addToast } = useToasts();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setConfirm("");
  };

  const newUser = async (body) => {
    try {
      const response = await fetch(`${URL_SERVER}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const res = await response.json();
        throw new Error(res);
      }
      clearInputs();
      addToast({
        title: " Success",
        type: "Success",
        body: "Registration successful",
      });
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  };

  const handleAddUser = async (e) => {
    try {
      e.preventDefault();
      if (password === confirm) {
        const body = { email, password };
        await newUser(body);
      } else {
        throw new Error("Password and confirmation did not match!");
      }
    } catch (error) {
      addToast({
        title: " Registration Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  return (
    <Fragment>
      <Navbar opacity={"nav-opaque"} />
      <div class="modal fade " id="strongpassword" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Password Requirements</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <ul>
                <li>8+ Characters</li>
                <li>Don't use something easy to guess like "password123"</li>
                <li>
                  Use at least one capital letter and one special character
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                OK, I get it!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white p-5 justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12">
            <h1>Sign Up</h1>
            <form onSubmit={handleAddUser}>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">
                  Password
                </label>

                <input
                  type="password"
                  class="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div
                  id="password-reqs"
                  class="form-text"
                  data-bs-toggle="modal"
                  data-bs-target="#strongpassword"
                  style={{ cursor: "pointer" }}
                >
                  Use a strong password
                </div>
              </div>
              <div class="mb-3">
                <label for="confirmpassword" class="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmpassword"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                />
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-center">
                <button type="submit" class="btn btn-primary">
                  Sign Up
                </button>
                <Link to="/Login">
                  <button type="button" class="btn btn-outline-primary">
                    Log In
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Signup;
