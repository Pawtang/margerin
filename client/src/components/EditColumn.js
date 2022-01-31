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
    min,
    step,
    maxlength,
    minlength,
    currentState,
    onBlur,
  } = props;

  useEffect(() => {
    !_.isEmpty(currentState) && setNewValue(currentState);
  }, []);

  return (
    <div className={colWidth}>
      <input
        type={type}
        className="form-control user-select-all"
        placeholder={placeholder}
        aria-label={label}
        value={newValue}
        pattern={pattern}
        maxlength={maxlength}
        minlength={minlength}
        min={min}
        step={step}
        onChange={(e) => {
          setNewValue(e.target.value);
        }}
        onBlur={onBlur}
      />
    </div>
  );
};

export default EditColumn;
