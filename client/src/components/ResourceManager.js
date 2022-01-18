import { React, Fragment, useState, useEffect } from "react";
import _ from "lodash";

const ResourceManager = (props) => {
  const { resourceType, hasDate, hasRating } = props;
  return (
    <Fragment>
      <div className="container-xxl shadow rounded-3 bg-white">
        <h1>Manage %Resource%</h1>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                aria-label="Search products..."
                aria-describedby="search-products"
                // value={}
                onChange={(e) => {}}
              />
            </div>
          </div>
        </div>

        <div className="row row-cols-6 gx-1">
          <div className="col-3">
            <h6 className="text-center">Supplier</h6>
          </div>
          <div className="col-1">
            <h6 className="text-center">Quantity</h6>
          </div>
          <div className="col-2">
            <h6 className="text-center">Unit</h6>
          </div>
          <div className="col-2">
            <h6 className="text-center">Total Cost</h6>
          </div>
          <div className="col-2">
            <h6 className="text-center">Date</h6>
          </div>
          <div className="col-2">
            <h6 className="text-center"></h6>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResourceManager;
