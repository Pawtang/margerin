import { useEffect } from "react";
import _ from "lodash";

const EditPerUnitCheck = (props) => {
  const { id, currentState, editPerUnit, setEditPerUnit } = props;

  useEffect(() => {
    setEditPerUnit(() => currentState);
  }, []);

  return (
    <div className="col-1 text-center">
      <input
        type="checkbox"
        className="btn-check"
        id={id}
        autoComplete="off"
        value={editPerUnit}
        onClick={() => {
          setEditPerUnit((editPerUnit) => !editPerUnit);
        }}
      />
      <label className="btn btn-outline-secondary" htmlFor={id}>
        {editPerUnit ? <i className="bi bi-check"></i> : "--"}
      </label>
    </div>
  );
};

export default EditPerUnitCheck;
