import React from "react";
import Dropdown from "./components/Dropdown";
import "./App.css";

function App() {
  const Movies = [
    "Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Lord of the Rings: The Return of the King",
    "The Matrix",
  ];

  return (
    <div className="container">
      <div className="col">
        <h2>Dropdown Component Single Select</h2>
        <Dropdown dropdownOptions={Movies} label="Movies" />
      </div>

      <div className="col">
        <h2>Dropdown Component MultiSelect</h2>
        <Dropdown dropdownOptions={Movies} isMultiSelect label="Movies" />
      </div>
    </div>
  );
}

export default App;
