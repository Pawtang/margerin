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
import ManagerCard from "./elements/ManagerCard";
import Navbar from "./Navbar";
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
import { useToasts } from "../contexts/ToastContext";
import { useTokens } from "../contexts/UserContext";

const TransactionManager = () => {
  const { token } = useTokens();
  const { addToast } = useToasts();
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
    try {
      const materialList = await getMaterials(token);
      setMaterials(materialList);
      !_.isEmpty(materialList) &&
        setNewTransactionMaterial(materialList[0].material_id);
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
    try {
      const unitList = await getUnits(token);
      setUnits(unitList);
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }

    try {
      const supplierList = await getSuppliers(token);
      setSuppliers(supplierList);
      !_.isEmpty(supplierList) &&
        setNewTransactionSupplier(supplierList[0].supplier_id);
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const retrieveTransactions = async () => {
    try {
      const array = await getTransactionData(token);
      setTransactions(array);
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const handleAddTransaction = async () => {
    try {
      const body = {
        newTransactionDate,
        newTransactionMaterial,
        newTransactionSupplier,
        newTransactionUnit,
        newTransactionCost,
        newTransactionQuantity,
      };
      clearNew();
      await newTransaction(body, token);
      retrieveTransactions();
      addToast({
        title: " Success",
        type: "Success",
        body: "Transaction added",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const handleEditTransaction = async (id) => {
    try {
      const body = {
        editTransactionMaterial,
        editTransactionSupplier,
        editTransactionUnit,
        editTransactionCost,
        editTransactionQuantity,
        editTransactionDate,
      };
      await editTransaction(id, body, token);
      retrieveTransactions();
      clearEdit();
      addToast({
        title: " Success",
        type: "Success",
        body: "Transaction updated",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const handleDeleteTransaction = async (transactionID) => {
    try {
      await deleteTransaction(transactionID, token);
      setTransactions(
        transactions.filter(
          (transaction) => transaction.transaction_id !== transactionID
        )
      );
      retrieveTransactions();
      addToast({
        title: " Success",
        type: "Success",
        body: "Transaction deleted",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
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
      <Navbar opacity={"nav-opaque"} />
      <div className="container">
        <div className="row">
          <AppNav></AppNav>
        </div>
      </div>

      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white px-4">
          <h1 className="my-3">Transaction Manager</h1>
          <div className="p-3 mx-auto gx-1  mb-2 row ">
            <div className="row border-bottom py-2 mb-2 gx-2 ">
              <h3>Add Transactions</h3>
              <div className="col-12 col-sm-4 col-md-2">
                <HeaderColumn display={""} headerText={"Transaction Date"} />
                <EditColumn
                  display={""}
                  type={"date"}
                  label={"Date"}
                  newValue={newTransactionDate}
                  setNewValue={setNewTransactionDate}
                  placeholder={"Transaction Date"}
                />
              </div>
              <div className="col-12 col-md-2 col-sm-4">
                <HeaderColumn display={""} headerText={"Material"} />
                <SelectColumn
                  display={""}
                  // id={"selectSupplier"}
                  label={"Supplier"}
                  list={suppliers}
                  itemkey={"supplier_name"}
                  id={"supplier_id"}
                  // currentState={suppliers[0].supplier_id}
                  newValue={newTransactionSupplier}
                  setNewValue={setNewTransactionSupplier}
                />
              </div>
              <div className="col-12 col-md-2 col-sm-4">
                <HeaderColumn display={""} headerText={"Supplier"} />
                <SelectColumn
                  // display={"col-2"}
                  // id={"selectSupplier"}
                  label={"Supplier"}
                  list={suppliers}
                  itemkey={"supplier_name"}
                  id={"supplier_id"}
                  // currentState={suppliers[0].supplier_id}
                  newValue={newTransactionSupplier}
                  setNewValue={setNewTransactionSupplier}
                />
              </div>
              <div className="col-12 col-md-1 col-sm-4">
                <HeaderColumn display={""} headerText={"Quantity"} />
                <EditColumn
                  // display={"col-1"}
                  type={"number"}
                  label={"Quantity"}
                  min={0}
                  newValue={newTransactionQuantity}
                  setNewValue={setNewTransactionQuantity}
                  placeholder={"0"}
                />
              </div>
              <div className="col-12 col-md-2 col-sm-4">
                <HeaderColumn display={""} headerText={"Unit"} />
                <SelectColumn
                  // display={"col-2"}
                  // id={"selectUnit"}
                  label={"Unit"}
                  list={units}
                  itemkey={"unit_name"}
                  id={"unit_id"}
                  currentState={1}
                  newValue={newTransactionUnit}
                  setNewValue={setNewTransactionUnit}
                />
              </div>
              <div className="col-12 col-md-2 col-sm-4">
                <HeaderColumn display={""} headerText={"Total Cost"} />
                <InputCost
                  display={""}
                  value={newTransactionCost}
                  setter={setNewTransactionCost}
                />
              </div>
              <div className="col-12 col-md-1">
                <HeaderColumn display={""} headerText={""} />
                <div className=" text-center d-grid">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleAddTransaction}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="row row-cols-7 gx-1 mt-4"> */}
          </div>

          <div className="row row-cols-6 border-bottom py-2 mb-2 gx-2"></div>
          {/* --------------------------- Enumerated Existing -------------------------- */}
          <div className="d-none d-sm-block">
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
          </div>
          <div className="d-block d-sm-none">
            {!_.isEmpty(transactions) &&
              transactions.map((transaction) => {
                return (
                  <ManagerCard
                    itemtype={"Transaction"}
                    id={transaction.transaction_id}
                    itemName={transaction.material_name}
                    description={"description"}
                    handleDeleteItem={handleDeleteTransaction}
                    setRowToEdit={setRowToEdit}
                    editRow={rowToEdit}
                    editName={editTransactionMaterial}
                    setEditName={setEditTransactionMaterial}
                    handleEdit={handleEditTransaction}
                    clearEdit={clearEdit}
                    displayRows={[
                      {
                        label: "Date",
                        value: dayjs(transaction.transaction_date).format(
                          "MMM D, YYYY"
                        ),
                      },
                      {
                        label: "Supplier",
                        value: transaction.supplier_name,
                      },
                      {
                        label: "Quantity",
                        value:
                          transaction.quantity + " " + transaction.unit_name,
                      },
                      {
                        label: "Cost",
                        value: "$" + transaction.cost,
                      },
                    ]}
                    editRows={[
                      {
                        label: "Date",
                        type: "date",
                        value: editTransactionDate,
                        defaultValue: transaction.transaction_date,
                        onChange: setEditTransactionDate,
                      },
                      {
                        label: "Supplier",
                        select: true,
                        type: "text",
                        value: editTransactionSupplier,
                        defaultValue: transaction.supplier_id,
                        onChange: setNewTransactionSupplier,
                        display: "col-2 mt-2",
                        label: "Supplier",
                        list: suppliers,
                        itemkey: "supplier_name",
                        id: "supplier_id",
                        currentState: transaction.supplier_id,
                        newValue: editTransactionSupplier,
                        setNewValue: setEditTransactionSupplier,
                      },
                      {
                        label: "Quantity",
                        type: "text",
                        value: editTransactionQuantity,
                        defaultValue: transaction.quantity,
                        onChange: setEditTransactionQuantity,
                      },
                      {
                        label: "Cost",
                        type: "text",
                        value: editTransactionCost,
                        defaultValue: transaction.cost,
                        onChange: setEditTransactionCost,
                      },
                    ]}
                  />
                );
              })}
          </div>
          {/* ----------------------------------- End ---------------------------------- */}
        </div>
      </div>
    </Fragment>
  );
};

export default TransactionManager;
