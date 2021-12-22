import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import AppNav from "./AppNav";

const Product = () => {
  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container ">
        <div className="row">
          <AppNav></AppNav>
        </div>

        <div className="row gx-5 shadow rounded-3 p-4">
          <div className="col ">
            <div className="row">
              <div className="col-2 gx-0">
                <div className="square-image mx-auto"></div>
              </div>
              <div className="col-10">
                <h3>Mango Bolero</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent eu gravida mauris. Donec at mi in nulla rhoncus
                  sollicitudin sit amet sit amet felis.
                </p>
                <h6>
                  Average Cost to Produce:
                  <span class="bg-success p-1 m-2 white rounded-3">$0.00</span>
                </h6>
              </div>
            </div>
            <div className="row">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Material</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mango</td>
                    <td>16</td>
                    <td>Each</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="update delete"
                      >
                        <button className="btn btn-outline-primary">
                          Edit
                        </button>
                        <button className="btn btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Habaneros</td>
                    <td>12</td>
                    <td>lb</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="update delete"
                      >
                        <button className="btn btn-outline-primary">
                          Edit
                        </button>
                        <button className="btn btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Vinegar</td>
                    <td>3</td>
                    <td>Cups</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="update delete"
                      >
                        <button className="btn btn-outline-primary">
                          Edit
                        </button>
                        <button className="btn btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
