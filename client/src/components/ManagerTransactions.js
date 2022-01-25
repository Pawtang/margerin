import { React, Fragment, useState, useEffect } from "react";
import AppNav from "./AppNav";
import HeaderColumn from "./HeaderColumn";
import DisplayColumn from "./DisplayColumn";
import ButtonsColumn from "./ButtonsColumn";
import EditColumn from "./EditColumn";
import _ from "lodash";
import {} from "../middleware/ProductHasMaterialUtils";
import {
  getTransactionData,
  deleteTransaction,
  newTransaction,
} from "../middleware/TransactionUtils";

const TransactionManager = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransactionMaterial, setNewTransactionMaterial] = useState("");
  const [newTransactionSupplier, setNewTransactionSupplier] = useState("");
  const [newTransactionUnit, setNewTransactionUnit] = useState("");
  const [newTransactionQuantity, setNewTransactionQuantity] = useState("");
  const [newTransactionCost, setNewTransactionCost] = useState("");
  const [newTransactionName, setNewTransactionName] = useState("");
  const [newTransactionContactName, setNewTransactionContactName] =
    useState("");
  const [newTransactionPhone, setNewTransactionPhone] = useState("");
  const [newTransactionRating, setNewTransactionRating] = useState(5);

  const retrieveTransactions = async () => {
    const array = await getTransactionData();
    setTransactions(array);
  };

  const handleAddTransaction = async () => {
    const body = {
      newTransactionName,
      newTransactionContactName,
      newTransactionPhone,
      newTransactionRating,
    };
    await newTransaction(body);
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
          <div className="row row-cols-5 gx-1 mt-4">
            <HeaderColumn colWidth={"col-3"} headerText={"Transaction Name"} />
            <HeaderColumn colWidth={"col-3"} headerText={"Contact Name"} />
            <HeaderColumn colWidth={"col-3"} headerText={"Contact Phone"} />
            <HeaderColumn
              colWidth={"col-2"}
              headerText={"Transaction Rating"}
            />
            <HeaderColumn colWidth={"col-1"} headerText={""} />
          </div>

          <div className="row row-cols-6 border-bottom py-2 mb-2 gx-2">
            <EditColumn
              colWidth={"col-3"}
              type={"text"}
              label={"Name"}
              newValue={newTransactionName}
              setNewValue={setNewTransactionName}
              placeholder={"Transaction Name"}
            />
            <EditColumn
              colWidth={"col-3"}
              type={"text"}
              label={"Contact"}
              newValue={newTransactionContactName}
              setNewValue={setNewTransactionContactName}
              placeholder={"Contact Name"}
            />
            <EditColumn
              colWidth={"col-3"}
              type={"tel"}
              label={"Tel"}
              newValue={newTransactionPhone}
              setNewValue={setNewTransactionPhone}
              placeholder={"000-000-0000"}
              pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
            />
            <EditColumn
              colWidth={"col-2"}
              type={"quantity"}
              label={"Rating"}
              newValue={newTransactionRating}
              setNewValue={setNewTransactionRating}
              placeholder={"Rating"}
            />

            <div className="col-1 text-center">
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
            transactions.map((Transaction) => (
              <div
                className="row row-cols-5 border-bottom py-2 mb-2 gx-0"
                key={Transaction.Transaction_id}
              >
                <DisplayColumn
                  colWidth={"col-3"}
                  content={Transaction.Transaction_name}
                />
                <DisplayColumn
                  colWidth={"col-3"}
                  content={Transaction.contact_name}
                />
                <DisplayColumn
                  colWidth={"col-3"}
                  content={Transaction.Transaction_phone}
                />
                <DisplayColumn
                  colWidth={"col-2"}
                  content={Transaction.Transaction_rating}
                />
                <ButtonsColumn
                  display={"col-1 text-center"}
                  ID={Transaction.Transaction_id}
                  handleDeleteTransaction={handleDeleteTransaction}
                />
              </div>
            ))}

          {/* ----------------------------------- End ---------------------------------- */}
        </div>
      </div>
    </Fragment>
  );
};

export default TransactionManager;
