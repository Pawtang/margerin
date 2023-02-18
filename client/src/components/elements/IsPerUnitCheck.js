import { useEffect } from "react";
// import _ from "lodash";

const IsPerUnitCheck = (props) => {
  const { id, currentState, isPerUnit, setIsPerUnit } = props;

  useEffect(() => {
    setIsPerUnit(() => currentState);
  }, []);

  return (
    <div className="col-1 text-center">
      <input
        checked={isPerUnit ? true : false}
        type="checkbox"
        className="btn-check"
        id={id}
        autoComplete="off"
        value={isPerUnit}
        onChange={() => {
          setIsPerUnit((isPerUnit) => !isPerUnit);
        }}
      />
      <label className="btn btn-outline-secondary" htmlFor={id}>
        {isPerUnit ? <i className="bi bi-check"></i> : "--"}
      </label>
    </div>
  );
};

export default IsPerUnitCheck;
