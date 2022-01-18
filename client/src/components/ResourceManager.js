import { React, Fragment, useState, useEffect } from "react";
import _ from "lodash";

const ResourceManager = (props) => {
  const { resourceType, hasDate, hasRating } = props;
  return (
    <Fragment>
      <div className="container-xxl">
        <div className="row shadow rounded-3 bg-white">
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
      </div>
    </Fragment>
  );
};

export default ResourceManager;
