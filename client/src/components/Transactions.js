import { React, Fragment } from "react";
import _ from "lodash";
import SelectWithToggleColumn from "./elements/SelectWithToggleColumn";
import EditColumn from "./elements/EditColumn";
import InputCost from "./elements/InputCost";
import SelectColumn from "./elements/SelectColumn";
import HeaderColumn from "./elements/HeaderColumn";
import dayjs from "dayjs";

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
  } = props;

  return (
    <Fragment>
      <div className="row row-cols-6 gx-1">
        <HeaderColumn colWidth={"col-3"} headerText={"Supplier"} />
        <HeaderColumn colWidth={"col-1"} headerText={"Quantity"} />
        <HeaderColumn colWidth={"col-2"} headerText={"Unit"} />
        <HeaderColumn colWidth={"col-2"} headerText={"Total Cost"} />
        <HeaderColumn colWidth={"col-2"} headerText={"Transaction Date"} />
        <HeaderColumn colWidth={"col-2"} headerText={""} />
      </div>

      <div className="row row-cols-6 border-bottom py-2 mb-2 gx-1">
        {/* --------------------------------- Inputs --------------------------------- */}
        {/* -------------------------------- Supplier -------------------------------- */}

        <SelectWithToggleColumn
          classes={"col-3"}
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
          colWidth={"col-1"}
          type={"number"}
          label={"Quantity"}
          min={0}
          newValue={transactionQuantity}
          setNewValue={setTransactionQuantity}
          placeholder={"0"}
        />

        {/* ---------------------------------- Unit ---------------------------------- */}
        <SelectColumn
          colWidth={"col-2"}
          id={"selectUnit"}
          label={"Unit"}
          list={units}
          itemkey={"unit_name"}
          id={"unit_id"}
          newValue={transactionUnit}
          setNewValue={setTransactionUnit}
        />
        {/* ---------------------------------- Cost ---------------------------------- */}
        <InputCost
          display={"col-2"}
          value={transactionCost}
          setter={setTransactionCost}
        />
        {/* 
        <EditColumn
          colWidth={"col-2"}
          type={"number"}
          step={"0.01"}
          min={0}
          label={"Rating"}
          newValue={transactionCost}
          setNewValue={setTransactionCost}
          onBlur={() => {
            !isNaN(transactionCost) &&
              setTransactionCost(parseFloat(transactionCost).toFixed(2));
          }}
          placeholder={"0.00"}
        /> */}

        {/* ---------------------------------- Date ---------------------------------- */}
        <div className="col-2">
          <input
            type="date"
            className="form-control user-select-all"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
        </div>

        {/* --------------------------------- Buttons -------------------------------- */}
        <div className="col-2">
          <button
            className="btn btn-primary"
            onClick={() => handleAddTransactionForMaterial()}
          >
            Add Transaction
          </button>
        </div>
      </div>
      {/* --------------------------- Enumerated Existing -------------------------- */}
      {!_.isEmpty(transactionsForMaterial) &&
        transactionsForMaterial.map((transaction) => (
          <div className="row row-cols-6 border-bottom py-2 mb-2 gx-0">
            <div className="col-3">
              <div className="col" key={transaction.transaction_id}>
                <p className="text-center">{transaction.supplier_name}</p>
              </div>
            </div>
            <div className="col-1">
              <div className="col" key={transaction.transaction_id}>
                <p className="text-center">{transaction.quantity}</p>
              </div>
            </div>
            <div className="col-2">
              <div className="col" key={transaction.transaction_id}>
                <p className="text-center">{transaction.unit_name}</p>
              </div>
            </div>
            <div className="col-2">
              <div className="col" key={transaction.transaction_id}>
                <p className="text-center">{transaction.cost}</p>
              </div>
            </div>
            <div className="col-2">
              <div className="col" key={transaction.transaction_id}>
                <p className="text-center">
                  {dayjs(transaction.transaction_date).format("MMM D, YYYY")}
                </p>
              </div>
            </div>
            <div className="col-2 text-center">
              <div
                className="btn-group"
                role="group"
                aria-label="update delete"
                key={transaction.transaction_id}
              >
                <button className="btn btn-outline-primary">
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    handleDeleteTransaction(transaction.transaction_id);
                  }}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default Transactions;
