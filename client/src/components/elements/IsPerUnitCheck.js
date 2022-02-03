import { useEffect } from "react";
import _ from "lodash";

const IsPerUnitCheck = (props) => {
  const { currentState, isPerUnit, setIsPerUnit } = props;

  useEffect(() => {
    setIsPerUnit(currentState);
  }, []);

  return (
    <div className="col-1 text-center">
      <input
        type="checkbox"
        className="btn-check"
        id="btn-check-outlined"
        autoComplete="off"
        value={isPerUnit}
        onClick={() => {
          setIsPerUnit((prevCheck) => !prevCheck);
        }}
      />
      <label className="btn btn-outline-secondary" htmlFor="btn-check-outlined">
        {isPerUnit ? <i className="bi bi-check"></i> : "--"}
      </label>
    </div>
  );
};

export default IsPerUnitCheck;
