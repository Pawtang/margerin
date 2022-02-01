import React, { Fragment } from "react";

function Signup() {
  return (
    <Fragment>
      <div className="navbar-clearance"></div>

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
            <form>
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
                />
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-center">
                <button type="submit" class="btn btn-primary">
                  Sign Up
                </button>
                <button type="button" class="btn btn-outline-primary">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Signup;
