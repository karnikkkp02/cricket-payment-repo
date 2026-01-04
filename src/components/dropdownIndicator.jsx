import { components } from "react-select";
import { DropDownArrowIcon, DropDownIcon } from "./svg";


export const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? (
          <DropDownArrowIcon fillColor="#797979" />
        ) : (
          <DropDownIcon fillColor="#797979" />
        )}
      </components.DropdownIndicator>
    )
  );
};
