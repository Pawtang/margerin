const ButtonAcceptColumn = (props) => {
  const {
    handleEditSupplier,
    supplierID,
    setRowToEdit,
    clearEdit,
    retrieveSuppliers,
  } = props;
  return (
    <div className="col-2 text-center d-grid">
      <button
        className="btn btn-outline-secondary"
        onClick={() => {
          handleEditSupplier(supplierID);
          setRowToEdit("");
          clearEdit();
        }}
      >
        <i className="bi bi-check-lg"></i>
      </button>
    </div>
  );
};

export default ButtonAcceptColumn;
