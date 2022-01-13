const AddPropModal = (props) => {
  <div class="modal fade" tabindex="-1" id="newProductModal">
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
          <form action="" onSubmit={handleAddProduct}>
            <label for="productName" class="form-label">
              Product Name
            </label>
            <input
              type="text"
              class="form-control"
              id="productName"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <label for="productDescription" class="form-label">
              Product Description
            </label>
            <textarea
              type="text"
              rows="3"
              class="form-control"
              id="productDescription"
              value={newProductDescription}
              onChange={(e) => setnewProductDescription(e.target.value)}
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
  </div>;
};
