import { React, Fragment, useState, useEffect } from "react";
import AppNav from "./AppNav";
import HeaderColumn from "./HeaderColumn";
import DisplayColumn from "./DisplayColumn";
import ButtonsColumn from "./ButtonsColumn";
import EditColumn from "./EditColumn";
import { getSuppliers } from "../middleware/ProductHasMaterialUtils";
import {
  deleteSupplier,
  newSupplier,
  editSupplier,
} from "../middleware/SupplierUtils";
import _ from "lodash";
import ButtonAcceptColumn from "./ButtonAcceptColumn";

const ManagerSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  /* ------------------------------- Adding New ------------------------------- */
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierContactName, setNewSupplierContactName] = useState("");
  const [newSupplierPhone, setNewSupplierPhone] = useState("");
  const [newSupplierRating, setNewSupplierRating] = useState(5);

  /* ------------------------------ Edit Exiting ------------------------------ */
  const [rowToEdit, setRowToEdit] = useState("");
  const [editSupplierName, setEditSupplierName] = useState("");
  const [editSupplierContactName, setEditSupplierContactName] = useState("");
  const [editSupplierPhone, setEditSupplierPhone] = useState("");
  const [editSupplierRating, setEditSupplierRating] = useState("");

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

  const handleEditSupplier = async (id) => {
    const body = {
      editSupplierName,
      editSupplierContactName,
      editSupplierPhone,
      editSupplierRating,
    };
    await editSupplier(id, body);
  };

  const handleDeleteSupplier = async (supplierID) => {
    await deleteSupplier(supplierID);
    setSuppliers(
      suppliers.filter((supplier) => supplier.supplier_id !== supplierID)
    );
    retrieveSuppliers();
  };

  const clearEdit = () => {
    setEditSupplierContactName("");
    setEditSupplierName("");
    setEditSupplierPhone("");
    setEditSupplierRating(5);
  };

  useEffect(() => {
    retrieveSuppliers();
  }, [rowToEdit]);

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
          <h1 className="my-3">Supplier Manager</h1>
          <div className="row row-cols-5 gx-1 mt-4">
            <HeaderColumn colWidth={"col-3"} headerText={"Supplier Name"} />
            <HeaderColumn colWidth={"col-3"} headerText={"Contact Name"} />
            <HeaderColumn colWidth={"col-3"} headerText={"Contact Phone"} />
            <HeaderColumn colWidth={"col-2"} headerText={"Supplier Rating"} />
            <HeaderColumn colWidth={"col-1"} headerText={""} />
          </div>

          <div className="row row-cols-6 border-bottom py-2 mb-2 gx-2">
            <EditColumn
              colWidth={"col-3"}
              type={"text"}
              label={"Name"}
              newValue={newSupplierName}
              setNewValue={setNewSupplierName}
              placeholder={"Supplier Name"}
            />
            <EditColumn
              colWidth={"col-3"}
              type={"text"}
              label={"Contact"}
              newValue={newSupplierContactName}
              setNewValue={setNewSupplierContactName}
              placeholder={"Contact Name"}
            />
            <EditColumn
              colWidth={"col-3"}
              type={"tel"}
              label={"Tel"}
              newValue={newSupplierPhone}
              setNewValue={setNewSupplierPhone}
              placeholder={"000-000-0000"}
              pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
            />
            <EditColumn
              colWidth={"col-2"}
              type={"quantity"}
              label={"Rating"}
              newValue={newSupplierRating}
              setNewValue={setNewSupplierRating}
              placeholder={"Rating"}
            />

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
            suppliers.map((supplier) => {
              return supplier.supplier_id !== rowToEdit ? (
                <div
                  className="row row-cols-5 border-bottom py-2 mb-2 gx-2"
                  key={supplier.supplier_id}
                >
                  <DisplayColumn
                    colWidth={"col-3"}
                    content={supplier.supplier_name}
                  />
                  <DisplayColumn
                    colWidth={"col-3"}
                    content={supplier.contact_name}
                  />
                  <DisplayColumn
                    colWidth={"col-3"}
                    content={supplier.supplier_phone}
                  />
                  <DisplayColumn
                    colWidth={"col-2"}
                    content={supplier.supplier_rating}
                  />
                  <ButtonsColumn
                    display={"col-1 text-center d-grid"}
                    ID={supplier.supplier_id}
                    handleDeleteResource={handleDeleteSupplier}
                    setRowToEdit={setRowToEdit}
                  />
                </div>
              ) : (
                <div
                  className="row row-cols-5 border-bottom py-2 mb-2 gx-2"
                  key={supplier.supplier_id}
                >
                  <EditColumn
                    colWidth={"col-3"}
                    type={"text"}
                    label={"Name"}
                    newValue={editSupplierName}
                    setNewValue={setEditSupplierName}
                    placeholder={"Supplier Name"}
                    currentState={supplier.supplier_name}
                  />
                  <EditColumn
                    colWidth={"col-3"}
                    type={"text"}
                    label={"Contact"}
                    newValue={editSupplierContactName}
                    setNewValue={setEditSupplierContactName}
                    placeholder={"Contact Name"}
                    currentState={supplier.contact_name}
                  />
                  <EditColumn
                    colWidth={"col-3"}
                    type={"tel"}
                    label={"Tel"}
                    newValue={editSupplierPhone}
                    setNewValue={setEditSupplierPhone}
                    placeholder={"000-000-0000"}
                    pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
                    currentState={supplier.supplier_phone}
                  />
                  <EditColumn
                    colWidth={"col-2"}
                    type={"quantity"}
                    label={"Rating"}
                    newValue={editSupplierRating}
                    setNewValue={setEditSupplierRating}
                    placeholder={"Rating"}
                    currentState={supplier.supplier_rating}
                  />
                  <ButtonAcceptColumn
                    setRowToEdit={setRowToEdit}
                    supplierID={supplier.supplier_id}
                    handleEditSupplier={handleEditSupplier}
                    clearEdit={clearEdit}
                    retrieveSuppliers={retrieveSuppliers}
                  />
                </div>
              );
            })}

          {/* ----------------------------------- End ---------------------------------- */}
        </div>
      </div>
    </Fragment>
  );
};

export default ManagerSuppliers;
