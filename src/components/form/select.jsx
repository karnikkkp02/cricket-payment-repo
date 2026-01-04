import Select from "react-select";
import { forwardRef } from "react";
import { DropdownIndicator } from "../dropdownIndicator";

 const CustomSelect = forwardRef((props, ref) => {
  const { label, showError, errorMessage, parentInlineStyle, ...rest } = props;
  return (
    <div className="inputContainer" style={parentInlineStyle}>
      <label htmlFor={label} className="label">
        {label}
      </label>
      <Select components={{ DropdownIndicator }} ref={ref} {...rest} />
      {showError && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
});

export default CustomSelect;
