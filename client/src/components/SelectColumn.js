import { useEffect } from "react";
import _ from "lodash";

const SelectColumn = (props) => {
  const { colWidth, label, newValue, setNewValue, currentState, id, content } =
    props;

  useEffect(() => {
    !_.isEmpty(currentState) && setNewValue(currentState);
  }, []);

  return (
    <div className={colWidth}>
      <select
        className="form-select"
        aria-label={label}
        value={newValue}
        onChange={(e) => {
          setNewValue(e.target.value);
        }}
      >
        <option value={id} key={id}>
          {content}
        </option>
      </select>
    </div>
  );
};

export default SelectColumn;
