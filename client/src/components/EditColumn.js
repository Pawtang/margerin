import { useEffect, useState } from "react";
import _ from "lodash";

const EditColumn = (props) => {
  const {
    colWidth,
    type,
    label,
    newValue,
    setNewValue,
    placeholder,
    pattern,
    currentState,
  } = props;

  useEffect(() => {
    !_.isEmpty(currentState) && setNewValue(currentState);
  }, []);

  return (
    <div className={colWidth}>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        aria-label={label}
        value={newValue}
        pattern={pattern}
        onChange={(e) => {
          setNewValue(e.target.value);
        }}
      />
    </div>
  );
};

export default EditColumn;
