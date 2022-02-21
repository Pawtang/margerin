import { React, Fragment, useState, useEffect } from "react";
import AppNav from "./AppNav";
import HeaderColumn from "./elements/HeaderColumn";
import DisplayColumn from "./elements/DisplayColumn";
import ButtonsColumn from "./elements/ButtonsColumn";
import EditColumn from "./elements/EditColumn";
import ButtonAcceptColumn from "./elements/ButtonAcceptColumn";
import { getSuppliers } from "../middleware/ProductHasMaterialUtils";
import Navbar from "./Navbar";
import {
  deleteSupplier,
  newSupplier,
  editSupplier,
} from "../middleware/SupplierUtils";
import _ from "lodash";
import { useToasts } from "../contexts/ToastContext";
import { ErrorHandling } from "../middleware/ErrorHandling";

const ManagerSuppliers = () => {
  const { addToast } = useToasts();
  const [suppliers, setSuppliers] = useState([]);

  /* ------------------------------- Adding New ------------------------------- */
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierContactName, setNewSupplierContactName] = useState("");
  const [newSupplierPhone, setNewSupplierPhone] = useState("");
  // const [newSupplierRating, setNewSupplierRating] = useState("");

  /* ------------------------------ Edit Exiting ------------------------------ */
  const [rowToEdit, setRowToEdit] = useState("");
  const [editSupplierName, setEditSupplierName] = useState("");
  const [editSupplierContactName, setEditSupplierContactName] = useState("");
  const [editSupplierPhone, setEditSupplierPhone] = useState("");
  // const [editSupplierRating, setEditSupplierRating] = useState("");

  const retrieveSuppliers = async () => {
    try {
      const array = await getSuppliers();
      setSuppliers(array);
    } catch (err) {
      addToast({
        title: "Failed to load suppliers",
        type: "Error",
        body: ErrorHandling(err),
      });
    }
  };

  const handleAddSupplier = async () => {
    try {
      const body = {
        newSupplierName,
        newSupplierContactName,
        newSupplierPhone,
      };
      await newSupplier(body);
      retrieveSuppliers();
    } catch (err) {
      addToast({
        title: "Failed to add supplier",
        type: "Error",
        body: ErrorHandling(err),
      });
    }
  };

  const handleEditSupplier = async (id) => {
    try {
      const body = {
        editSupplierName,
        editSupplierContactName,
        editSupplierPhone,
      };
      await editSupplier(id, body);
      retrieveSuppliers();
    } catch (err) {
      addToast({
        title: "Failed to edit supplier",
        type: "Error",
        body: ErrorHandling(err),
      });
    }
  };

  const handleDeleteSupplier = async (supplierID) => {
    try {
      await deleteSupplier(supplierID);
      setSuppliers(
        suppliers.filter((supplier) => supplier.supplier_id !== supplierID)
      );
      retrieveSuppliers();
    } catch (err) {
      addToast({
        title: "Failed to delete supplier",
        type: "Error",
        body: ErrorHandling(err),
      });
    }
  };

  const clearEdit = () => {
    setEditSupplierContactName("");
    setEditSupplierName("");
    setEditSupplierPhone("");
    // setEditSupplierRating("");
  };

  useEffect(() => {
    retrieveSuppliers();
  }, [rowToEdit]);

  return (
    <Fragment>
      <Navbar opacity={"nav-opaque"} />
      <div className="container">
        <div className="row">
          <AppNav></AppNav>
        </div>
      </div>

      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white px-4">
          <h1 className="my-3">Supplier Manager</h1>
          <div className="row row-cols-5 gx-1 mt-4">
            <HeaderColumn display={"col-4"} headerText={"Supplier Name"} />
            <HeaderColumn display={"col-3"} headerText={"Contact Name"} />
            <HeaderColumn display={"col-3"} headerText={"Contact Phone"} />
            {/* <HeaderColumn display={"col-2"} headerText={"Supplier Rating"} /> */}
            <HeaderColumn display={"col-2"} headerText={""} />
          </div>

          <div className="row row-cols-6 border-bottom py-2 mb-2 gx-2">
            <EditColumn
              display={"col-4"}
              type={"text"}
              label={"Name"}
              newValue={newSupplierName}
              setNewValue={setNewSupplierName}
              placeholder={"Supplier Name"}
            />
            <EditColumn
              display={"col-3"}
              type={"text"}
              label={"Contact"}
              newValue={newSupplierContactName}
              setNewValue={setNewSupplierContactName}
              placeholder={"Contact Name"}
            />
            <EditColumn
              display={"col-3"}
              label={"Tel"}
              type={"tel"}
              newValue={newSupplierPhone}
              setNewValue={setNewSupplierPhone}
              placeholder={"000-000-0000"}
            />

            <div className="col-2 text-center d-grid">
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
                  className="row row-cols-5 border-bottom py-2 gx-2 highlight"
                  key={supplier.supplier_id}
                >
                  <DisplayColumn
                    display={"col-4"}
                    content={supplier.supplier_name}
                  />
                  <DisplayColumn
                    display={"col-3"}
                    content={supplier.contact_name}
                  />
                  <DisplayColumn
                    display={"col-3"}
                    content={supplier.supplier_phone}
                  />
                  <ButtonsColumn
                    display={"col-2 text-center d-grid"}
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
                    display={"col-4"}
                    type={"text"}
                    label={"Name"}
                    newValue={editSupplierName}
                    setNewValue={setEditSupplierName}
                    placeholder={"Supplier Name"}
                    currentState={supplier.supplier_name}
                  />
                  <EditColumn
                    display={"col-3"}
                    type={"text"}
                    label={"Contact"}
                    newValue={editSupplierContactName}
                    setNewValue={setEditSupplierContactName}
                    placeholder={"Contact Name"}
                    currentState={supplier.contact_name}
                  />
                  <EditColumn
                    display={"col-3"}
                    type={"tel"}
                    label={"Tel"}
                    newValue={editSupplierPhone}
                    setNewValue={setEditSupplierPhone}
                    placeholder={"000-000-0000"}
                    pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
                    maxlength={10}
                    minlength={10}
                    currentState={supplier.supplier_phone}
                  />

                  <ButtonAcceptColumn
                    display={"col-2 d-grid"}
                    setRowToEdit={setRowToEdit}
                    resourceID={supplier.supplier_id}
                    editHandler={handleEditSupplier}
                    clearEdit={clearEdit}
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
