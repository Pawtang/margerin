const ButtonAcceptColumn = (props) => {
  const { display, editHandler, resourceID, setRowToEdit, clearEdit } = props;
  return (
    <div className={display}>
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
