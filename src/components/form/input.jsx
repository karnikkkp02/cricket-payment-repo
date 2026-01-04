import React from "react";
import "./input.css"
const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  id,
  className = "",
  error,
  ...rest
}) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={id || name} className="input-label">
          {label}
        </label>
      )}

      <input
        id={id || name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={`common-input ${error ? "input-error" : ""} ${className}`}
        {...rest}
      />

      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
