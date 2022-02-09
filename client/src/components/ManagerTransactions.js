import { React, Fragment, useState, useEffect } from "react";
import dayjs from "dayjs";
import AppNav from "./AppNav";
import HeaderColumn from "./elements/HeaderColumn";
import DisplayColumn from "./elements/DisplayColumn";
import ButtonsColumn from "./elements/ButtonsColumn";
import EditColumn from "./elements/EditColumn";
import InputCost from "./elements/InputCost";
import SelectColumn from "./elements/SelectColumn";
import ButtonAcceptColumn from "./elements/ButtonAcceptColumn";
import _ from "lodash";
import {
  getMaterials,
  getUnits,
  getSuppliers,
} from "../middleware/ProductHasMaterialUtils";
import {
  getTransactionData,
  deleteTransaction,
  newTransaction,
  editTransaction,
} from "../middleware/TransactionUtils";

const TransactionManager = () => {
  const todayDate = new Date().toISOString().split("T")[0];
  /* ----------------------------- New Transaction ---------------------------- */
  const [transactions, setTransactions] = useState([]);
  const [newTransactionMaterial, setNewTransactionMaterial] = useState("");
  const [newTransactionSupplier, setNewTransactionSupplier] = useState("");
  const [newTransactionUnit, setNewTransactionUnit] = useState("1");
  const [newTransactionQuantity, setNewTransactionQuantity] = useState("0");
  const [newTransactionCost, setNewTransactionCost] = useState("0.00");
  const [newTransactionDate, setNewTransactionDate] = useState(todayDate);
  /* ---------------------------- Edit Transactions --------------------------- */
  const [editTransactionMaterial, setEditTransactionMaterial] = useState("");
  const [editTransactionSupplier, setEditTransactionSupplier] = useState("");
  const [editTransactionUnit, setEditTransactionUnit] = useState("");
  const [editTransactionQuantity, setEditTransactionQuantity] = useState("");
  const [editTransactionCost, setEditTransactionCost] = useState("");
  const [editTransactionDate, setEditTransactionDate] = useState("");

  /* -------------------------------- Options -------------------------------- */
  const [materials, setMaterials] = useState([]);
  const [units, setUnits] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  /* -------------------------------- Utilities ------------------------------- */
  const [rowToEdit, setRowToEdit] = useState("");

  const loadLists = async () => {
    const allMaterials = await getMaterials();
    const unitList = await getUnits();
    const supplierList = await getSuppliers();
    setMaterials(allMaterials);
    setUnits(unitList);
    setSuppliers(supplierList);
  };

  const retrieveTransactions = async () => {
    const array = await getTransactionData();
    setTransactions(array);
  };

  const handleAddTransaction = async () => {
    const body = {
      newTransactionDate,
      newTransactionMaterial,
      newTransactionSupplier,
      newTransactionUnit,
      newTransactionCost,
      newTransactionQuantity,
    };
    await newTransaction(body);
    retrieveTransactions();
    clearNew();
  };

  const handleEditTransaction = async (id) => {
    const body = {
      editTransactionMaterial,
      editTransactionSupplier,
      editTransactionUnit,
      editTransactionCost,
      editTransactionQuantity,
      editTransactionDate,
    };
    await editTransaction(id, body);
    retrieveTransactions();
    clearEdit();
  };

  const handleDeleteTransaction = async (transactionID) => {
    await deleteTransaction(transactionID);
    setTransactions(
      transactions.filter(
        (transaction) => transaction.transaction_id !== transactionID
      )
    );
    retrieveTransactions();
  };

  const clearEdit = () => {
    setEditTransactionCost("");
    setEditTransactionDate("");
    setEditTransactionMaterial("");
    setEditTransactionQuantity("");
    setEditTransactionSupplier("");
    setEditTransactionUnit("");
  };

  const clearNew = () => {
    setNewTransactionCost("0.00");
    setNewTransactionDate(todayDate);
    setNewTransactionMaterial("");
    setNewTransactionQuantity("0");
    setNewTransactionSupplier("");
    setNewTransactionUnit("1");
  };

  useEffect(() => {
    loadLists();
  }, []);

  useEffect(() => {
    retrieveTransactions();
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
          <h1 className="my-3">Transaction Manager</h1>
          <div className="row row-cols-7 gx-1 mt-4">
            <HeaderColumn display={"col-2"} headerText={"Transaction Date"} />
            <HeaderColumn display={"col-2"} headerText={"Material"} />
            <HeaderColumn display={"col-2"} headerText={"Supplier"} />
            <HeaderColumn display={"col-1"} headerText={"Quantity"} />
            <HeaderColumn display={"col-2"} headerText={"Unit"} />
            <HeaderColumn display={"col-1"} headerText={"Total Cost"} />
            <HeaderColumn display={"col-2"} headerText={""} />
          </div>

          <div className="row row-cols-6 border-bottom py-2 mb-2 gx-2">
            <EditColumn
              display={"col-2"}
              type={"date"}
              label={"Date"}
              newValue={newTransactionDate}
              setNewValue={setNewTransactionDate}
              placeholder={"Transaction Date"}
            />
            <SelectColumn
              display={"col-2"}
              label={"Material"}
              list={materials}
              itemkey={"material_name"}
              id={"material_id"}
              newValue={newTransactionMaterial}
              setNewValue={setNewTransactionMaterial}
            />
            <SelectColumn
              display={"col-2"}
              id={"selectSupplier"}
              label={"Supplier"}
              list={suppliers}
              itemkey={"supplier_name"}
              id={"supplier_id"}
              newValue={newTransactionSupplier}
              setNewValue={setNewTransactionSupplier}
            />
            <EditColumn
              display={"col-1"}
              type={"number"}
              label={"Quantity"}
              min={0}
              newValue={newTransactionQuantity}
              setNewValue={setNewTransactionQuantity}
              placeholder={"0"}
            />
            <SelectColumn
              display={"col-2"}
              id={"selectUnit"}
              label={"Unit"}
              list={units}
              itemkey={"unit_name"}
              id={"unit_id"}
              currentState={1}
              newValue={newTransactionUnit}
              setNewValue={setNewTransactionUnit}
            />

            <InputCost
              display={"col-2"}
              value={newTransactionCost}
              setter={setNewTransactionCost}
            />

            <div className="col-1 text-center d-grid">
              <button
                className="btn btn-outline-primary"
                onClick={handleAddTransaction}
              >
                Add
              </button>
            </div>
          </div>
          {/* --------------------------- Enumerated Existing -------------------------- */}
          {!_.isEmpty(transactions) &&
            transactions.map((transaction) => {
              return transaction.transaction_id !== rowToEdit ? (
                <div
                  className="row row-cols-5 border-bottom py-2 gx-2 highlight"
                  key={transaction.transaction_id}
                >
                  <DisplayColumn
                    display={"col-2 text-center"}
                    content={dayjs(transaction.transaction_date).format(
                      "MMM D, YYYY"
                    )}
                  />
                  <DisplayColumn
                    display={"col-2 "}
                    content={transaction.material_name}
                  />
                  <DisplayColumn
                    display={"col-2 "}
                    content={transaction.supplier_name}
                  />
                  <DisplayColumn
                    display={"col-1 text-center"}
                    content={transaction.quantity}
                  />
                  <DisplayColumn
                    display={"col-2 text-center"}
                    content={transaction.unit_name}
                  />
                  <DisplayColumn
                    display={"col-2 text-center"}
                    content={transaction.cost}
                  />
                  <ButtonsColumn
                    display={"col-1 d-grid"}
                    ID={transaction.transaction_id}
                    handleDeleteResource={handleDeleteTransaction}
                    setRowToEdit={setRowToEdit}
                  />
                </div>
              ) : (
                <div className="row row-cols-6 border-bottom py-2 gx-2">
                  <EditColumn
                    display={"col-2"}
                    type={"date"}
                    label={"Date"}
                    currentState={dayjs(transaction.transaction_date).format(
                      "YYYY-MM-DD"
                    )}
                    newValue={editTransactionDate}
                    setNewValue={setEditTransactionDate}
                    placeholder={"Transaction Name"}
                  />
                  <SelectColumn
                    display={"col-2"}
                    label={"Material"}
                    list={materials}
                    itemkey={"material_name"}
                    id={"material_id"}
                    currentState={transaction.material_id}
                    newValue={editTransactionMaterial}
                    setNewValue={setEditTransactionMaterial}
                  />
                  <SelectColumn
                    display={"col-2"}
                    label={"Supplier"}
                    list={suppliers}
                    itemkey={"supplier_name"}
                    id={"supplier_id"}
                    currentState={transaction.supplier_id}
                    newValue={editTransactionSupplier}
                    setNewValue={setEditTransactionSupplier}
                  />
                  <EditColumn
                    display={"col-1"}
                    type={"number"}
                    label={"Quantity"}
                    min={0}
                    currentState={transaction.quantity}
                    newValue={editTransactionQuantity}
                    setNewValue={setEditTransactionQuantity}
                    placeholder={"Qty"}
                  />
                  <SelectColumn
                    display={"col-2"}
                    label={"Unit"}
                    list={units}
                    itemkey={"unit_name"}
                    id={"unit_id"}
                    currentState={transaction.unit_id}
                    newValue={editTransactionUnit}
                    setNewValue={setEditTransactionUnit}
                  />

                  <InputCost
                    display={"col-2"}
                    currentState={transaction.cost}
                    value={editTransactionCost}
                    setter={setEditTransactionCost}
                  />

                  <ButtonAcceptColumn
                    display={"col-1 text-center d-grid"}
                    setRowToEdit={setRowToEdit}
                    resourceID={transaction.transaction_id}
                    editHandler={handleEditTransaction}
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

export default TransactionManager;
