import { React, Fragment, useState, useEffect } from "react";
import dayjs from "dayjs";
import AppNav from "./AppNav";
import HeaderColumn from "./HeaderColumn";
import DisplayColumn from "./DisplayColumn";
import ButtonsColumn from "./ButtonsColumn";
import EditColumn from "./EditColumn";
import SelectColumn from "./SelectColumn";
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
  /* ----------------------------- New Transaction ---------------------------- */
  const [transactions, setTransactions] = useState([]);
  const [newTransactionMaterial, setNewTransactionMaterial] = useState("");
  const [newTransactionSupplier, setNewTransactionSupplier] = useState("");
  const [newTransactionUnit, setNewTransactionUnit] = useState("");
  const [newTransactionQuantity, setNewTransactionQuantity] = useState("");
  const [newTransactionCost, setNewTransactionCost] = useState("");
  const [newTransactionDate, setNewTransactionDate] = useState("");
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
  };

  const handleEditTransaction = async () => {
    const body = {
      editTransactionMaterial,
      editTransactionSupplier,
      editTransactionUnit,
      editTransactionCost,
      editTransactionQuantity,
      editTransactionDate,
    };
    await editTransaction(body);
    retrieveTransactions();
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
          <div className="row row-cols-7 gx-1 mt-4">
            <HeaderColumn colWidth={"col-2"} headerText={"Transaction Date"} />
            <HeaderColumn colWidth={"col-2"} headerText={"Material"} />
            <HeaderColumn colWidth={"col-2"} headerText={"Supplier"} />
            <HeaderColumn colWidth={"col-2"} headerText={"Unit"} />
            <HeaderColumn colWidth={"col-1"} headerText={"Quantity"} />
            <HeaderColumn colWidth={"col-1"} headerText={"Total Cost"} />
            <HeaderColumn colWidth={"col-2"} headerText={""} />
          </div>

          <div className="row row-cols-6 border-bottom py-2 mb-2 gx-2">
            <EditColumn
              colWidth={"col-2"}
              type={"date"}
              label={"Name"}
              newValue={newTransactionDate}
              setNewValue={setNewTransactionDate}
              placeholder={"Transaction Name"}
            />
            <SelectColumn
              colWidth={"col-2"}
              type={"text"}
              label={"Material"}
              newValue={newTransactionMaterial}
              setNewValue={setNewTransactionMaterial}
            />
            <SelectColumn
              colWidth={"col-2"}
              id={"selectSupplier"}
              label={"Supplier"}
              newValue={newTransactionSupplier}
              setNewValue={setNewTransactionSupplier}
            />
            <SelectColumn
              colWidth={"col-2"}
              id={"selectUnit"}
              label={"Unit"}
              newValue={newTransactionUnit}
              setNewValue={setNewTransactionUnit}
            />
            <EditColumn
              colWidth={"col-1"}
              type={"number"}
              label={"Quantity"}
              min={0}
              newValue={newTransactionQuantity}
              setNewValue={setNewTransactionQuantity}
              placeholder={"Qty"}
            />
            <EditColumn
              colWidth={"col-1"}
              type={"number"}
              step={"0.01"}
              min={0}
              label={"Rating"}
              newValue={newTransactionCost}
              setNewValue={setNewTransactionCost}
              onBlur={() => {
                !isNaN(newTransactionCost) &&
                  setNewTransactionCost(
                    parseFloat(newTransactionCost).toFixed(2)
                  );
              }}
              placeholder={"0.00"}
            />

            <div className="col-2 text-center d-grid">
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
                  className="row row-cols-5 border-bottom py-2 mb-2 gx-0"
                  key={transaction.transaction_id}
                >
                  <DisplayColumn
                    colWidth={"col-2 text-center"}
                    content={dayjs(transaction.transaction_date).format(
                      "MMM D, YYYY"
                    )}
                  />
                  <DisplayColumn
                    colWidth={"col-2 text-center"}
                    content={transaction.material_name}
                  />
                  <DisplayColumn
                    colWidth={"col-2 text-center"}
                    content={transaction.supplier_name}
                  />
                  <DisplayColumn
                    colWidth={"col-2 text-center"}
                    content={transaction.unit_name}
                  />
                  <DisplayColumn
                    colWidth={"col-1 text-center"}
                    content={transaction.quantity}
                  />
                  <DisplayColumn
                    colWidth={"col-1 text-center"}
                    content={transaction.cost}
                  />
                  <ButtonsColumn
                    display={"col-2 d-grid"}
                    ID={transaction.transaction_id}
                    handleDeletetransaction={handleDeleteTransaction}
                    setRowToEdit={setRowToEdit}
                  />
                </div>
              ) : (
                <div className="test">Enumerate Edits</div>
              );
            })}

          {/* ----------------------------------- End ---------------------------------- */}
        </div>
      </div>
    </Fragment>
  );
};

export default TransactionManager;
