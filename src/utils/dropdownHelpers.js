export const getTruncatedSelectedValues = (selectedValues, maxLength = 50) => {
  const displayedValues = Array.isArray(selectedValues)
    ? selectedValues.join(", ")
    : selectedValues;
  return displayedValues.length > maxLength
    ? `${displayedValues.slice(0, maxLength - 3)}...`
    : displayedValues;
};
