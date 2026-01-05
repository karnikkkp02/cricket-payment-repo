import React from "react";
import "./input.css"

 const Input = React.forwardRef((props, ref) => {
  const {
    label,
    parentInlineStyle,
    errorMessage,
    showError,
    required,
    ...restInputProps
  } = props;
  return (
    <div className="inputContainer" style={parentInlineStyle}>
      <label htmlFor={label} className="label">
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input className="input" ref={ref} {...restInputProps} />
      {showError && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
});

export default Input;
