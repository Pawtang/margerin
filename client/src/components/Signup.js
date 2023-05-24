import { React, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useToasts } from "../contexts/ToastContext";
import { useTokens } from "../contexts/UserContext";

function Signup() {
  const URL_SERVER = process.env.REACT_APP_URL;
  const { addToast } = useToasts();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { setToken } = useTokens();
  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail("");
    setUsername("");
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
      const res = await response.json();

      setToken(res.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  };

  const handleAddUser = async (e) => {
    try {
      e.preventDefault();
      if (password === confirm) {
        const body = { username, email, password };
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
      {/* <div className="modal fade " id="strongpassword" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Password Requirements</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul>
                <li>8+ Characters</li>
                <li>Don't use something easy to guess like "password123"</li>
                <li>
                  Use at least one capital letter and one special character
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                OK, I get it!
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white p-5 justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12">
            <h1>Sign Up</h1>
            <form onSubmit={handleAddUser}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Project Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  aria-describedby="usernameHelp"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  autoComplete="name"
                  minLength={1}
                />
                <div id="emailHelp" className="form-text">
                  Project or personal name. You can change this later.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="email"
                  minLength={3}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="new-password"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                />
                <div
                  id="password-reqs"
                  className="form-text"
                  // data-bs-toggle="modal"
                  // data-bs-target="#strongpassword"
                  // style={{ cursor: "pointer" }}
                >
                  Password must contain eight characters, at least one letter,
                  one number, and one special character
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                />
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                <Link to="/Login">
                  <button type="button" className="btn btn-outline-primary">
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
