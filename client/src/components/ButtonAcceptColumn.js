const ButtonAcceptColumn = (props) => {
  const { display, ID, handleDeleteResource, setRowToEdit } = props;
  return (
    <div className="col-1 text-center d-grid">
      <button className="btn btn-outline-secondary">
        <i class="bi bi-check-lg"></i>
      </button>
    </div>
  );
};

export default ButtonAcceptColumn;
