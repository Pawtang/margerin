import { React, Fragment, useState } from "react";
import _ from "lodash";
import DisplayColumn from "./elements/DisplayColumn";
import ButtonsColumn from "./elements/ButtonsColumn";
import SelectWithToggleColumn from "./elements/SelectWithToggleColumn";
import EditColumn from "./elements/EditColumn";
import InputCost from "./elements/InputCost";
import SelectColumn from "./elements/SelectColumn";
import HeaderColumn from "./elements/HeaderColumn";
import dayjs from "dayjs";
import ButtonAcceptColumn from "./elements/ButtonAcceptColumn";
import { editTransaction } from "../middleware/TransactionUtils";
import { useToasts } from "../contexts/ToastContext";

const Transactions = (props) => {
  const {
    units,
    handleAddTransactionForMaterial,
    handleDeleteTransaction,
    suppliers,
    transactionsForMaterial,
    transactionSupplier,
    setTransactionSupplier,
    transactionQuantity,
    setTransactionQuantity,
    transactionUnit,
    setTransactionUnit,
    transactionCost,
    setTransactionCost,
    transactionDate,
    setTransactionDate,
    modalMaterial,
    retrieveTransactionsForMaterial,
  } = props;

  const { addToast } = useToasts();
  const [rowToEdit, setRowToEdit] = useState("");
  const editTransactionMaterial = modalMaterial.material_id;
  const [editTransactionSupplier, setEditTransactionSupplier] = useState("");
  const [editTransactionUnit, setEditTransactionUnit] = useState("");
  const [editTransactionQuantity, setEditTransactionQuantity] = useState("");
  const [editTransactionCost, setEditTransactionCost] = useState("");
  const [editTransactionDate, setEditTransactionDate] = useState("");

  const clearEdit = () => {
    setEditTransactionCost("");
    setEditTransactionDate("");
    setEditTransactionQuantity("");
    setEditTransactionSupplier("");
    setEditTransactionUnit("");
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
      await editTransaction(id, body);
      await retrieveTransactionsForMaterial();
      clearEdit();
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  return (
    <Fragment>
      <div className="row row-cols-6 gx-1">
        <HeaderColumn display={"col-3"} headerText={"Supplier"} />
        <HeaderColumn display={"col-1"} headerText={"Quantity"} />
        <HeaderColumn display={"col-2"} headerText={"Unit"} />
        <HeaderColumn display={"col-2"} headerText={"Total Cost"} />
        <HeaderColumn display={"col-2"} headerText={"Transaction Date"} />
        <HeaderColumn display={"col-2"} headerText={""} />
      </div>

      <div className="row row-cols-6 border-bottom py-2 mb-2 gx-1">
        {/* --------------------------------- Inputs --------------------------------- */}
        {/* -------------------------------- Supplier -------------------------------- */}

        <SelectWithToggleColumn
          display={"col-3"}
          label={"Supplier"}
          list={suppliers}
          itemkey={"supplier_name"}
          id={"supplier_id"}
          newValue={transactionSupplier}
          setNewValue={setTransactionSupplier}
          modalID={"#newSupplierModal"}
        />

        {/* -------------------------------- Quantity -------------------------------- */}
        <EditColumn
          display={"col-1"}
          type={"number"}
          label={"Quantity"}
          min={0}
          newValue={transactionQuantity}
          setNewValue={setTransactionQuantity}
          placeholder={"0"}
        />

        {/* ---------------------------------- Unit ---------------------------------- */}
        <SelectColumn
          display={"col-2"}
          // id={"selectUnit"}
          label={"Unit"}
          list={units}
          itemkey={"unit_name"}
          id={"unit_id"}
          currentState={1}
          newValue={transactionUnit}
          setNewValue={setTransactionUnit}
        />
        {/* ---------------------------------- Cost ---------------------------------- */}
        <InputCost
          display={"col-2"}
          value={transactionCost}
          setter={setTransactionCost}
        />

        {/* ---------------------------------- Date ---------------------------------- */}
        <EditColumn
          display={"col-2"}
          type={"date"}
          label={"Date"}
          newValue={transactionDate}
          setNewValue={setTransactionDate}
          placeholder={"Transaction Date"}
        />

        {/* --------------------------------- Buttons -------------------------------- */}

        <div className="col-2 d-grid">
          <button
            className="btn btn-mary"
            onClick={() => handleAddTransactionForMaterial()}
          >
            Add Transaction
          </button>
        </div>
      </div>
      {/* --------------------------- Enumerated Existing -------------------------- */}
      {!_.isEmpty(transactionsForMaterial) &&
        transactionsForMaterial.map((transaction) => {
          return transaction.transaction_id !== rowToEdit ? (
            <div
              className="row row-cols-6 border-bottom py-2 mb-2 gx-0"
              key={transaction.transaction_id}
            >
              <DisplayColumn
                display={"col-3 text-center"}
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
              <DisplayColumn
                display={"col-2 text-center"}
                content={dayjs(transaction.transaction_date).format(
                  "MMM D, YYYY"
                )}
              />
              <ButtonsColumn
                display={"col-2 d-grid"}
                ID={transaction.transaction_id}
                handleDeleteResource={handleDeleteTransaction}
                setRowToEdit={setRowToEdit}
              />
            </div>
          ) : (
            <div className="row row-cols-6 border-bottom py-2 mb-2 gx-1">
              <SelectWithToggleColumn
                display={"col-3"}
                label={"Supplier"}
                list={suppliers}
                itemkey={"supplier_name"}
                id={"supplier_id"}
                currentState={transaction.supplier_id}
                newValue={editTransactionSupplier}
                setNewValue={setEditTransactionSupplier}
                modalID={"#newSupplierModal"}
              />

              <EditColumn
                display={"col-1"}
                type={"number"}
                label={"Quantity"}
                min={0}
                currentState={transaction.quantity}
                newValue={editTransactionQuantity}
                setNewValue={setEditTransactionQuantity}
                placeholder={"0"}
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

              <EditColumn
                display={"col-2"}
                type={"date"}
                label={"Date"}
                currentState={dayjs(transaction.transaction_date).format(
                  "YYYY-MM-DD"
                )}
                newValue={editTransactionDate}
                setNewValue={setEditTransactionDate}
                placeholder={"Transaction Date"}
              />

              <ButtonAcceptColumn
                display={"col-2 d-grid"}
                editHandler={handleEditTransaction}
                resourceID={transaction.transaction_id}
                setRowToEdit={setRowToEdit}
                clearEdit={clearEdit}
              />
            </div>
          );
        })}
    </Fragment>
  );
};

export default Transactions;
