const ButtonsColumn = (props) => {
  const { display, ID, handleDeleteResource } = props;
  return (
    <div className={display}>
      <div className="btn-group" role="group" aria-label="update delete">
        <button className="btn btn-outline-primary">
          <i className="bi bi-pencil-square"></i>
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            handleDeleteResource(ID);
          }}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default ButtonsColumn;
