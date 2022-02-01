import React, { Fragment, useState } from "react";
import ToastContainer from "./elements/ToastContainer";
import _ from "lodash";

const Login = () => {
  const [toasts, setToasts] = useState([]);
  //Toasts should be a queue structure, FIFO
  const pushToast = (type, content) => {
    setToasts([...toasts, { type: type, content: content, id: toasts.length }]);
    console.log(toasts);
    setTimeout(() => {
      !_.isEmpty(toasts) && setToasts([toasts.shift()]);
    }, 5000);
    console.log(toasts);
  };

  return (
    <Fragment>
      <ToastContainer toasts={toasts} />
      <div className="navbar-clearance"></div>
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
              <button
                class="btn btn-primary"
                onClick={() => {
                  pushToast("alert", "Test toast!");
                }}
              >
                Log In
              </button>
              <button class="btn btn-outline-primary">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
