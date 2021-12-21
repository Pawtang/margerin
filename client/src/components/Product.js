import { React, Fragment } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container">
        <div className="row mt-5  gx-5">
          <div className="col-3 ">
            <div className="row  my-4">
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

          <div className="col-9">
            <div className="row mt-5">
              <div className="col-6 gx-0">Buttons go here</div>
            </div>
            <div className="row">
              <div className="col gx-0">
                <div className="square-image mx-auto"></div>
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
