import Select from "react-select";
import { forwardRef } from "react";
import { DropdownIndicator } from "../dropdownIndicator";

 const CustomSelect = forwardRef((props, ref) => {
  const { label, showError, errorMessage, parentInlineStyle, required, ...rest } = props;
  return (
    <div className="inputContainer" style={parentInlineStyle}>
      <label htmlFor={label} className="label">
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <Select components={{ DropdownIndicator }} ref={ref} {...rest} />
      {showError && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
});

export default CustomSelect;
