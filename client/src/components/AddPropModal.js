const AddPropModal = (props) => {
  const itemType = props.itemType;
  const handleAddItem = props.handleAddItem;
  const newItemName = props.newItemName;
  const newItemDescription = props.newItemDescription;
  const setNewItemName = props.setNewItemName;
  const setNewItemDescription = props.setNewItemDescription;
  const clearEntry = props.clearEntry;

  return (
    <div class="modal fade" tabindex="-1" id={`new${itemType}Modal`}>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New {itemType}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => clearEntry()}
            ></button>
          </div>
          <div class="modal-body">
            <form action="" onSubmit={handleAddItem}>
              <label for="productName" class="form-label">
                {itemType} Name
              </label>
              <input
                type="text"
                class="form-control"
                id="productName"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <label for="productDescription" class="form-label">
                {itemType} Description
              </label>
              <textarea
                type="text"
                rows="3"
                class="form-control"
                id="productDescription"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
              />
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => clearEntry()}
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  // onClick={() => clearEntry()}
                >
                  Add product
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
