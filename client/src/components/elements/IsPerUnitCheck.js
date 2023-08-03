import { useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import _ from "lodash";

const IsPerUnitCheck = (props) => {
  const { display, id, currentState, isPerUnit, setIsPerUnit } = props;

  useEffect(() => {
    setIsPerUnit(() => currentState);
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" className="opacity-80" {...props}>
      Check if the material applies to each unit rather than divided by yield
    </Tooltip>
  );

  return (
    <OverlayTrigger
      trigger="hover"
      placement="top"
      opacity="50"
      delay={{ show: 100, hide: 400 }}
      overlay={renderTooltip}
    >
      <div className={`${display} text-center w-100`}>
        <input
          checked={isPerUnit ? true : false}
          type="checkbox"
          className="btn-check "
          id={id}
          autoComplete="off"
          value={isPerUnit}
          onChange={() => {
            setIsPerUnit((isPerUnit) => !isPerUnit);
          }}
        />

        <label className="btn btn-outline-secondary" htmlFor={id}>
          {isPerUnit ? (
            <i className="bi bi-check"></i>
          ) : (
            <i className="bi bi-plus-circle-dotted"></i>
          )}
        </label>
      </div>
    </OverlayTrigger>
  );
};

export default IsPerUnitCheck;
