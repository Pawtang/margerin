import { React, Fragment } from "react";
import AppNav from "./AppNav";
import _ from "lodash";
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

      <div className="row row-cols-6 border-bottom py-2 mb-2 gx-1">
        {/* --------------------------------- Inputs --------------------------------- */}
        {/* -------------------------------- Supplier -------------------------------- */}
        <div className="col-3">
          <div className="input-group">
            <select
              id="inputSupplier"
              className="form-select"
              value={transactionSupplier}
              onChange={(e) => setTransactionSupplier(e.target.value)}
            >
              <option disabled value="">
                Supplier
              </option>
              {!_.isEmpty(suppliers) &&
                suppliers.map((supplier) => (
                  <option
                    value={supplier.supplier_id}
                    key={supplier.supplier_id}
                  >
                    {supplier.supplier_name}
                  </option>
                ))}
            </select>
            <button
              className="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#newSupplierModal"
            >
              +
            </button>
          </div>
        </div>
        {/* -------------------------------- Quantity -------------------------------- */}
        <div className="col-1">
          <input
            type="number"
            className="form-control"
            placeholder="0"
            aria-label="Quantity"
            value={transactionQuantity}
            onChange={(e) => {
              setTransactionQuantity(e.target.value);
            }}
          />
        </div>
        {/* ---------------------------------- Unit ---------------------------------- */}
        <div className="col-2">
          <select
            id="inputUnits"
            className="form-select"
            value={transactionUnit}
            onChange={(e) => {
              setTransactionUnit(e.target.value);
            }}
          >
            <option disabled value="" className="text-muted">
              Select Unit...
            </option>
            {!_.isEmpty(units) &&
              units.map((unit) => (
                <option value={unit.unit_id} key={unit.unit_id}>
                  {unit.unit_name}
                </option>
              ))}
          </select>
        </div>
        {/* ---------------------------------- Cost ---------------------------------- */}
        <div className="col-2">
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control user-select-all"
              placeholder="0.00"
              aria-label="cost"
              step="0.01"
              min="0"
              value={transactionCost}
              onChange={(e) => {
                setTransactionCost(e.target.value);
              }}
              onBlur={() =>
                setTransactionCost(parseFloat(transactionCost).toFixed(2))
              }
            />
          </div>
        </div>
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
