import { useEffect } from "react";
import _ from "lodash";

const SelectWithToggleColumn = (props) => {
  const {
    display,
    label,
    list,
    itemkey,
    newValue,
    setNewValue,
    currentState,
    id,
    modalID,
  } = props;

  useEffect(() => {
    setNewValue(() => currentState);
  }, []);

  return (
    <div className={`${display}`}>
      <div className="input-group">
        <select
          className="form-select"
          aria-label={label}
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
          }}
        >
          <option disabled value="">
            {label}...
          </option>
          {!_.isEmpty(list) &&
            list.map((item) => {
              return (
                <option value={item[id]} key={item[id]}>
                  {item[itemkey]}
                </option>
              );
            })}
        </select>
        <button
          className="btn btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target={modalID}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SelectWithToggleColumn;
