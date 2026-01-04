import { forwardRef } from "react";
import "./radio.css"

 const Radio = forwardRef((props, ref) => {
  const { label, ...rest } = props;
  return (
    <label className="radioLabel">
      <input type="radio" className="radioInput" ref={ref} {...rest} />
      <span className="customRadio" />
      {label}
    </label>
  );
});

export default Radio;
