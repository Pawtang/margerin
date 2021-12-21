import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import AppNav from "./AppNav";

const Dashboard = () => {
  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container ">
        <div className="row ">
          <AppNav></AppNav>
        </div>
        <div className="row gx-5 shadow rounded-3">
          <div className="col-3 border-end">
            <div className="row my-4">
              <div className="col-8">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </div>
              <div className="col-2">
                <div className="btn btn-outline-dark">Search</div>
              </div>
            </div>

            <div className="row ">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mango Bolero</td>
                    <td>
                      <div className="btn btn-primary">...</div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Rio Verde</td>
                    <td>
                      <div className="btn btn-primary">...</div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Hullaballooberry</td>
                    <td>
                      <div className="btn btn-primary">...</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-9 p-4 gx-5">
            <div className="row">
              <div className="col">
                <div className="square-image"></div>
              </div>
              <div className="col-8">
                <h3>Mango Bolero</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent eu gravida mauris. Donec at mi in nulla rhoncus
                  sollicitudin sit amet sit amet felis.
                </p>
              </div>
            </div>
            <div className="row">
              <h3>Cost Data</h3>
              <p>Wholesale Cost:</p>
              <p>Direct to Customer Cost:</p>
              <p>Wholesale Cost:</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
