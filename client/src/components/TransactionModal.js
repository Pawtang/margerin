import React from "react";
// import { useTokens } from "../contexts/UserContext";
import Transactions from "./Transactions";

const TransactionModal = (props) => {
  const { modalMaterial, clearTransactionEntry } = props;

  return (
    <div className="modal fade" tabIndex="-1" id="materialTransactionModal">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Recent Transactions for {modalMaterial.material_name}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => clearTransactionEntry()}
            ></button>
          </div>

          <div className="modal-body">
            <Transactions {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
