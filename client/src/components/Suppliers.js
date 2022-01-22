import { React, Fragment, useState, useEffect } from "react";
import AppNav from "./AppNav";
import ResourceManager from "./ResourceManager";
import { getSuppliers } from "../middleware/ProductHasMaterialUtils";
import { deleteSupplier, newSupplier } from "../middleware/ResourceUtils";
import _ from "lodash";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierContactName, setNewSupplierContactName] = useState("");
  const [newSupplierPhone, setNewSupplierPhone] = useState("");
  const [newSupplierRating, setNewSupplierRating] = useState(5);

  const retrieveSuppliers = async () => {
    const array = await getSuppliers();
    setSuppliers(array);
  };

  const handleAddSupplier = async () => {
    const body = {
      newSupplierName,
      newSupplierContactName,
      newSupplierPhone,
      newSupplierRating,
    };
    await newSupplier(body);
    retrieveSuppliers();
  };

  const handleDeleteSupplier = async (supplierID) => {
    await deleteSupplier(supplierID);
    setSuppliers(
      suppliers.filter((supplier) => supplier.supplier_id !== supplierID)
    );
    retrieveSuppliers();
  };

  useEffect(() => {
    retrieveSuppliers();
  }, []);

  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container">
        <div className="row">
          <AppNav></AppNav>
        </div>
      </div>

      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white px-4">
          <div className="row row-cols-5 gx-1 mt-4">
            <div className="col-3">
              <h6 className="text-center">Supplier Name</h6>
            </div>
            <div className="col-3">
              <h6 className="text-center">Contact Name</h6>
            </div>
            <div className="col-3">
              <h6 className="text-center">Contact Number</h6>
            </div>
            <div className="col-2">
              <h6 className="text-center">Rating</h6>
            </div>
            <div className="col-1">
              <h6 className="text-center"></h6>
            </div>
          </div>

          <div className="row row-cols-6 border-bottom py-2 mb-2 gx-2">
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="Supplier Name"
                aria-label="Name"
                value={newSupplierName}
                onChange={(e) => {
                  setNewSupplierName(e.target.value);
                }}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="Contact Name"
                aria-label="Name"
                value={newSupplierContactName}
                onChange={(e) => {
                  setNewSupplierContactName(e.target.value);
                }}
              />
            </div>
            <div className="col-3">
              <input
                type="tel"
                className="form-control"
                placeholder="000-000-0000"
                aria-label="Name"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={newSupplierPhone}
                onChange={(e) => {
                  setNewSupplierPhone(e.target.value);
                }}
              />
            </div>
            <div className="col-2">
              <input
                type="quantity"
                className="form-control text-center"
                placeholder="Rating"
                aria-label="Name"
                value={newSupplierRating}
                onChange={(e) => {
                  setNewSupplierRating(e.target.value);
                }}
              />
            </div>

            <div className="col-1 text-center">
              <button
                className="btn btn-outline-primary"
                onClick={handleAddSupplier}
              >
                Add
              </button>
            </div>
          </div>
          {/* --------------------------- Enumerated Existing -------------------------- */}
          {!_.isEmpty(suppliers) &&
            suppliers.map((supplier) => (
              <div className="row row-cols-5 border-bottom py-2 mb-2 gx-0">
                <div className="col-3">
                  <div className="col" key={supplier.supplier_id}>
                    <p className="text-center">{supplier.supplier_name}</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="col" key={supplier.supplier_id}>
                    <p className="text-center">{supplier.contact_name}</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="col" key={supplier.supplier_id}>
                    <p className="text-center">{supplier.supplier_phone}</p>
                  </div>
                </div>
                <div className="col-2">
                  <div className="col" key={supplier.supplier_id}>
                    <p className="text-center">{supplier.supplier_rating}</p>
                  </div>
                </div>
                <div className="col-1 text-center">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="update delete"
                    key={supplier.supplier_id}
                  >
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      key={supplier.supplier_id}
                      onClick={() => {
                        handleDeleteSupplier(supplier.supplier_id);
                      }}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* ----------------------------------- End ---------------------------------- */}
        </div>
      </div>
    </Fragment>
  );
};

export default Suppliers;
