import { React, Fragment } from "react";
import AppNav from "./AppNav";

const Material = () => {
  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container ">
        <div className="row">
          <AppNav></AppNav>
        </div>

        <div className="row shadow rounded-3 p-4">
          <div className="col ">
            <div className="row">
              <div className="col gx-0">
                <div className="square-image mx-auto habanero"></div>
              </div>
              <div className="col-8">
                <h3>Habaneros</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent eu gravida mauris. Donec at mi in nulla rhoncus
                  sollicitudin sit amet sit amet felis.
                </p>
              </div>
            </div>
            <div className="row">
              <h3>Latest Costs from Suppliers</h3>
            </div>
            <div className="row">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Supplier</th>
                    <th scope="col">Latest Cost</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Supplier Rating</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Restaraunt Depot</td>
                    <td>$7.59</td>
                    <td>lb</td>
                    <td></td>
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
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <button className="btn btn-outline-dark">
                  New Transaction
                </button>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Material;
