import { React, Fragment, useState, useEffect } from "react";
import AppNav from "./AppNav";
import HeaderColumn from "./elements/HeaderColumn";
import DisplayColumn from "./elements/DisplayColumn";
import ButtonsColumn from "./elements/ButtonsColumn";
import EditColumn from "./elements/EditColumn";
import ButtonAcceptColumn from "./elements/ButtonAcceptColumn";
import { getSuppliers } from "../middleware/ProductHasMaterialUtils";
import Navbar from "./Navbar";
import ManagerCard from "./elements/ManagerCard";
import {
  deleteSupplier,
  newSupplier,
  editSupplier,
} from "../middleware/SupplierUtils";
import _ from "lodash";
import { useToasts } from "../contexts/ToastContext";
import { useTokens } from "../contexts/UserContext";

const ManagerSuppliers = () => {
  const { token } = useTokens();
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
      const array = await getSuppliers(token);
      setSuppliers(array);
      console.log(suppliers);
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
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
      await newSupplier(body, token);
      clearEntry();
      retrieveSuppliers();
      addToast({
        title: " Success",
        type: "Success",
        body: "Supplier added",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
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
      await editSupplier(id, body, token);
      retrieveSuppliers();
      addToast({
        title: " Success",
        type: "Success",
        body: "Supplier updated",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const handleDeleteSupplier = async (supplierID) => {
    try {
      await deleteSupplier(supplierID, token);
      setSuppliers(
        suppliers.filter((supplier) => supplier.supplier_id !== supplierID)
      );
      retrieveSuppliers();
      addToast({
        title: " Success",
        type: "Success",
        body: "Supplier deleted",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const clearEntry = () => {
    setNewSupplierName("");
    setNewSupplierContactName("");
    setNewSupplierPhone("");
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
          <div className="p-3 mx-auto gx-1  mb-2 row ">
            {/* <div className="row row-cols-3 border-bottom py-2 mb-2 gx-2 border"> */}
            <div className="row border-bottom py-2 mb-2 gx-2 ">
              <h3>Add Suppliers</h3>
              <div className="col-12 col-sm-5">
                <HeaderColumn display={""} headerText={"Supplier Name"} />
                <EditColumn
                  display={""}
                  type={"text"}
                  label={"Name"}
                  newValue={newSupplierName}
                  setNewValue={setNewSupplierName}
                  placeholder={"Supplier Name"}
                />
              </div>
              <div className="col-12  col-sm-5">
                <HeaderColumn
                  display={""}
                  headerText={"Supplier Description"}
                />
                <EditColumn
                  display={""}
                  type={"text"}
                  label={"Supplier Contact"}
                  newValue={newSupplierContactName}
                  setNewValue={setNewSupplierContactName}
                  placeholder={"Contact Name"}
                />
              </div>
              <div className="col-12 col-sm-2 text-center d-grid">
                <HeaderColumn display={""} headerText={""} />
                <button
                  className="btn btn-outline-primary"
                  onClick={handleAddSupplier}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          {/* --------------------------- Enumerated Existing -------------------------- */}
          <h3>Current Suppliers</h3>
          <div className="d-none d-sm-block">
            {!_.isEmpty(suppliers) &&
              suppliers.map((Supplier) => {
                return Supplier.supplier_id !== rowToEdit ? (
                  <div
                    className="row row-cols-3 border-bottom py-2 gx-2 highlight"
                    key={Supplier.supplier_id}
                  >
                    <DisplayColumn
                      display={"col-4"}
                      content={Supplier.supplier_name}
                    />
                    <DisplayColumn
                      display={"col-3"}
                      content={Supplier.contact_name}
                    />
                    <DisplayColumn
                      display={"col-3"}
                      content={Supplier.supplier_phone}
                    />
                    <ButtonsColumn
                      display={"col-2 text-center d-grid"}
                      ID={Supplier.supplier_id}
                      handleDeleteResource={handleDeleteSupplier}
                      setRowToEdit={setRowToEdit}
                    />
                  </div>
                ) : (
                  <div
                    className="row row-cols-5 border-bottom py-2 mb-2 gx-2"
                    key={Supplier.supplier_id}
                  >
                    <EditColumn
                      display={"col-5"}
                      type={"text"}
                      label={"Name"}
                      newValue={editSupplierName}
                      setNewValue={setEditSupplierName}
                      placeholder={"Supplier Name"}
                      currentState={Supplier.supplier_name}
                    />
                    <EditColumn
                      display={"col-5"}
                      type={"text"}
                      label={"Description"}
                      newValue={editSupplierContactName}
                      setNewValue={setEditSupplierContactName}
                      placeholder={"Supplier Description"}
                      currentState={Supplier.editSupplierContactName}
                    />
                    <ButtonAcceptColumn
                      display={"col-2 d-grid"}
                      setRowToEdit={setRowToEdit}
                      resourceID={Supplier.supplier_id}
                      editHandler={handleEditSupplier}
                      clearEdit={clearEdit}
                    />
                  </div>
                );
              })}
          </div>
          <div className="d-block d-sm-none">
            {!_.isEmpty(suppliers) &&
              suppliers.map((Supplier) => {
                return (
                  <ManagerCard
                    itemtype={"Supplier"}
                    id={Supplier.supplier_id}
                    itemName={Supplier.supplier_name}
                    handleDeleteItem={handleDeleteSupplier}
                    setRowToEdit={setRowToEdit}
                    editRow={rowToEdit}
                    editName={editSupplierName}
                    setEditName={setEditSupplierName}
                    handleEdit={handleEditSupplier}
                    clearEdit={clearEdit}
                    displayRows={[
                      {
                        label: "Contact Name",
                        value: Supplier.contact_name,
                      },
                      {
                        label: "Contact Phone",
                        value: Supplier.supplier_phone,
                      },
                    ]}
                    editRows={[
                      {
                        label: "Contact Name",
                        type: "text",
                        value: editSupplierContactName,
                        defaultValue: Supplier.contact_name,
                        onChange: setEditSupplierContactName,
                      },
                      {
                        label: "Contact Phone",
                        type: "text",
                        value: editSupplierPhone,
                        defaultValue: Supplier.supplier_phone,
                        onChange: setEditSupplierPhone,
                      },
                    ]}
                  />
                );
              })}
          </div>
          {/* ----------------------------------- End ---------------------------------- */}
        </div>
      </div>
      {/* <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white px-4">
          <h1 className="my-3">Supplier Manager</h1>
          <div className="row row-cols-5 gx-1 mt-4">
            <HeaderColumn display={"col-4"} headerText={"Supplier Name"} />
            <HeaderColumn display={"col-3"} headerText={"Contact Name"} />
            <HeaderColumn display={"col-3"} headerText={"Contact Phone"} />
            {/* <HeaderColumn display={"col-2"} headerText={"Supplier Rating"} /> */}
      {/* <HeaderColumn display={"col-2"} headerText={""} /> */}
      {/* </div>  */}

      {/* <div className="row row-cols-6 border-bottom py-2 mb-2 gx-2">
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
          </div> */}
      {/* --------------------------- Enumerated Existing -------------------------- */}
      {/* {!_.isEmpty(suppliers) &&
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
                </div> */}
      {/* );
           })} */}

      {/* ----------------------------------- End ---------------------------------- */}
      {/* </div> */}
      {/* // </div> */}
    </Fragment>
  );
};

export default ManagerSuppliers;
