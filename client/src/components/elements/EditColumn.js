import { useEffect, useState } from "react";
import _ from "lodash";

const EditColumn = (props) => {
  const {
    display,
    type,
    label,
    newValue,
    setNewValue,
    placeholder,

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
    <div className={display}>
      <input
        type={type}
        className="form-control user-select-all"
        placeholder={placeholder}
        aria-label={label}
        value={newValue}
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
