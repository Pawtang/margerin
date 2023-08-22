import ButtonAcceptColumn from "./ButtonAcceptColumn";
import ButtonsColumn from "./ButtonsColumn";

// Need to pass in a list of dictionaries and destructure into display and edit rows...

const ManagerCard = (props) => {
  const {
    id,
    itemName,
    itemtype,
    handleDeleteItem,
    setRowToEdit,
    editRow,
    editName,
    setEditName,
    // editDescription,
    // setEditDescription,
    handleEdit,
    clearEdit,
    displayRows,
    editRows,
    onChange,
  } = props;
  return (
    <>
      {id !== editRow ? (
        <div className="card my-4 shadow-sm" key={id}>
          <h5 className="card-header">{itemName}</h5>
          <div className="card-body">
            {displayRows.map((content) => {
              return (
                <div className="row my-2 mx-2 bg-light rounded p-2">
                  <div className="card-text h6 ">{content.label}</div>
                  <div className="card-text ">{content.value}</div>
                </div>
              );
            })}
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
      ) : (
        <div className="card my-4 shadow-sm" key={id}>
          <h5 className="card-header">
            <label htmlFor="">{itemtype} Name</label>
            <input
              className="form-control rounded border-primary"
              type="text"
              value={editName}
              defaultValue={itemName}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
            />
          </h5>
          <div className="card-body">
            <div className="row">
              <div className="col-12 d-grid mt-1">
                {editRows.map((content) => {
                  console.log(content);
                  return (
                    <>
                      <label htmlFor="">{content.label}</label>
                      <input
                        className="form-control rounded"
                        type="text"
                        defaultValue={content.defaultValue}
                        value={content.value}
                        onChange={(e) => {
                          content.onChange(e.target.value);
                        }}
                      />
                    </>
                  );
                })}
              </div>
            </div>
            <div className="row">
              <ButtonAcceptColumn
                display={"col-12 d-grid mt-1"}
                setRowToEdit={setRowToEdit}
                resourceID={id}
                editHandler={handleEdit}
                clearEdit={clearEdit}
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
      )}
    </>
  );
};

export default ManagerCard;
