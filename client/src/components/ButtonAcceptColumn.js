const ButtonAcceptColumn = (props) => {
  const { editHandler, resourceID, setRowToEdit, clearEdit } = props;
  return (
    <div className="col-2 text-center d-grid">
      <button
        className="btn btn-outline-secondary"
        onClick={() => {
          editHandler(resourceID);
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
