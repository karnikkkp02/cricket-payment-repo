import React from "react";
import "./input.css";

const CustomSelect = ({
  label,
  options,
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

      <select
        id={id || name}
        value={value}
        onChange={onChange}
        name={name}
        className={`common-select ${error ? "input-error" : ""} ${className}`}
        {...rest}
      >
        <option value="" disabled>
          {placeholder || "Select an option"}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default CustomSelect;
