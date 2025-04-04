import React from "react";
import "./style.css";
import { IoMdArrowDropdown } from "react-icons/io";

interface DropDownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (selectedString: string) => void;
}

const DropDownInput: React.FC<DropDownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="dropdown-container">
      <label className="dropdown-label">{label}*</label>
      <select
        className="dropdown-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <IoMdArrowDropdown />
    </div>
  );
};

export default DropDownInput;
