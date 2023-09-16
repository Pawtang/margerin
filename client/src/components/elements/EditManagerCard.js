import ButtonsColumn from "./ButtonsColumn";

const EditManagerCard = (props) => {
  const {
    itemtype,
    id,
    itemName,
    description,
    handleDeleteItem,
    setRowToEdit,
    editRow,
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    handleEdit,
    clearEdit,
  } = props;
  return (
    <div className="card my-4 shadow-sm" key={id}>
      <h5 className="card-header">
        <input
          type="text"
          value={editName}
          onChange={(e) => {
            setEditName(e.target.value);
          }}
        />
      </h5>
      <div className="card-body">
        <div className="row">
          <p className="card-text">
            <input
              type="text"
              value={editDescription}
              onChange={(e) => {
                setEditDescription(e.target.value);
              }}
            />
          </p>
        </div>
        <div className="row">
          <ButtonsColumn
            display={"text-center d-grid justify-content-end"}
            ID={id}
            handleDeleteResource={handleDeleteItem}
            setRowToEdit={setRowToEdit}
          />
        </div>
      </div>
    </div>

    // <div className="row row-cols-5 border-bottom py-2 mb-2 gx-2" key={id}>
    //   <EditColumn
    //     display={"col-5"}
    //     type={"text"}
    //     label={"Name"}
    //     newValue={editName}
    //     setNewValue={setEditName}
    //     placeholder={(itemtype, " Name")}
    //     currentState={itemName}
    //   />
    //   <EditColumn
    //     display={"col-5"}
    //     type={"text"}
    //     label={"Description"}
    //     newValue={editDescription}
    //     setNewValue={setEditDescription}
    //     placeholder={(itemtype, " Description")}
    //     currentState={description}
    //   />
    //   <ButtonAcceptColumn
    //     display={"col-2 d-grid"}
    //     setRowToEdit={setRowToEdit}
    //     resourceID={id}
    //     editHandler={handleEdit}
    //     clearEdit={clearEdit}
    //   />
    // </div>
  );
};

export default EditManagerCard;
