import { useEffect } from "react";
import _ from "lodash";

const SelectColumn = (props) => {
  const {
    display,
    label,
    list,
    itemkey,
    newValue,
    setNewValue,
    currentState,
    id,
  } = props;

  useEffect(() => {
    setNewValue(currentState);
  }, []);

  return (
    <div className={`${display}`}>
      <select
        className="form-select"
        aria-label={label}
        value={newValue}
        onChange={(e) => {
          setNewValue(e.target.value);
        }}
      >
        {!_.isEmpty(list) &&
          list.map((item) => {
            return (
              <option value={item[id]} key={item[id]}>
                {item[itemkey]}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default SelectColumn;
