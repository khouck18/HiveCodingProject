import React, { useState, useEffect, useRef } from "react";
import { getTruncatedSelectedValues } from "../utils/dropdownHelpers";
import "./Dropdown.css";

const Dropdown = ({ dropdownOptions, isMultiSelect = false, label }) => {
  //Variable assignment
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(isMultiSelect ? [] : "");
  const dropdownRef = useRef(null);

  //Function Calls
  useEffect(() => {
    const handleNonMenuClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleNonMenuClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleNonMenuClick);
    };
  }, [dropdownOpen]);

  const toggleDropdownVisability = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelected = (option) => {
    switch (true) {
      case !isMultiSelect:
        setSelectedValues(option);
        setDropdownOpen(false);
        break;
      case option === "Select All":
        setSelectedValues(dropdownOptions);
        break;
      case option === "Deselect All":
        setSelectedValues([]);
        break;
      default:
        const updatedOptionsList = selectedValues.includes(option)
          ? selectedValues.filter((item) => item !== option)
          : [...selectedValues, option];
        setSelectedValues(updatedOptionsList);
        break;
    }
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-wrapper">
        <label
          className={`dropdown-label ${
            dropdownOpen ||
            (isMultiSelect ? selectedValues.length > 0 : selectedValues !== "")
              ? dropdownOpen
                ? "dropdown-label-active"
                : "dropdown-label-inactive"
              : ""
          }`}
        >
          {label}
        </label>

        <button
          onClick={toggleDropdownVisability}
          className={`dropdown-toggle ${
            dropdownOpen ||
            (isMultiSelect ? selectedValues.length > 0 : selectedValues !== "")
              ? dropdownOpen
                ? "dropdown-toggle-focused"
                : ""
              : ""
          }`}
        >
          <div className="default-selection">
            <p>
              {selectedValues.length === 0
                ? ""
                : getTruncatedSelectedValues(selectedValues)}
            </p>
            <span
              className={`chevron ${
                dropdownOpen ? "chevron-up" : "chevron-down"
              }`}
            />
          </div>
        </button>
      </div>

      {dropdownOpen && (
        <div className="dropdown-menu">
          {isMultiSelect && (
            <div
              key={
                selectedValues.length !== dropdownOptions.length
                  ? "select-all"
                  : "deselect-all"
              }
              onClick={() =>
                selectedValues.length !== dropdownOptions.length
                  ? handleOptionSelected("Select All")
                  : handleOptionSelected("Deselect All")
              }
              className={`dropdown-item ${
                selectedValues.length === dropdownOptions.length
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                onChange={() =>
                  selectedValues.length !== dropdownOptions.length
                    ? handleOptionSelected("Select All")
                    : handleOptionSelected("Deselect All")
                }
                onClick={(e) => e.stopPropagation()}
                checked={selectedValues.length === dropdownOptions.length}
                className="dropdown-checkbox"
              />
              {selectedValues.length !== dropdownOptions.length
                ? "Select All"
                : "Deselect All"}
            </div>
          )}

          {dropdownOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionSelected(option)}
              className={`dropdown-item ${
                selectedValues.includes(option) ? "selected" : ""
              }`}
            >
              {isMultiSelect && (
                <input
                  type="checkbox"
                  onChange={() => handleOptionSelected(option)}
                  onClick={(e) => e.stopPropagation()}
                  checked={selectedValues.includes(option)}
                  className="dropdown-checkbox"
                />
              )}

              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
