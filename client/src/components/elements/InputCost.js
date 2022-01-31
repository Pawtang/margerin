import _ from "lodash";

const InputCost = (props) => {
  const { display, value, setter } = props;
  return (
    <div className={display}>
      <div className="input-group">
        <span className="input-group-text">$</span>
        <input
          type="number"
          className="form-control user-select-all"
          placeholder="0.00"
          aria-label="cost"
          step="0.01"
          min="0"
          value={value}
          onChange={(e) => {
            setter(e.target.value);
          }}
          onBlur={() => setter(parseFloat(value).toFixed(2))}
        />
      </div>
    </div>
  );
};

export default InputCost;
