const AddPropModal = (props) => {
  const itemType = props.itemType;
  const handleAddItem = props.handleAddItem;
  const newItemName = props.newItemName;
  const newItemDescription = props.newItemDescription;
  const setNewItemName = props.setNewItemName;
  const setNewItemDescription = props.setNewItemDescription;
  const clearEntry = props.clearEntry;

  return (
    <div className="modal fade" tabIndex="-1" id={`new${itemType}Modal`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New {itemType}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => clearEntry()}
            ></button>
          </div>
          <div className="modal-body">
            <form action="" onSubmit={handleAddItem}>
              <label htmlFor="productName" className="form-label">
                {itemType} Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              {itemType !== "Supplier" && (
                <>
                  <label htmlFor="productDescription" className="form-label">
                    {itemType} Description
                  </label>
                  <textarea
                    type="text"
                    rows="3"
                    className="form-control"
                    id="productDescription"
                    value={newItemDescription}
                    onChange={(e) => setNewItemDescription(e.target.value)}
                  />
                </>
              )}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => clearEntry()}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  // onClick={() => clearEntry()}
                >
                  Add {itemType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropModal;
