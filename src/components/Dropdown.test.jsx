import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";

describe("Dropdown Component Testing Suite", () => {
  const mockDropdownOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];

  it("renders the dropdown with the label", () => {
    render(
      <Dropdown dropdownOptions={mockDropdownOptions} label={"Option Label"} />,
    );
    expect(screen.getByText("Option Label")).toBeInTheDocument();
  });

  it("opens the dropdown menu when clicked", () => {
    render(
      <Dropdown dropdownOptions={mockDropdownOptions} label={"Option Label"} />,
    );
    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 4")).toBeInTheDocument();
  });

  it("closes the dropdown menu when clicking outside of the menu", () => {
    render(
      <div>
        <Dropdown dropdownOptions={mockDropdownOptions} label="Option Label" />
        <div data-testid="outside">Outside</div>
      </div>,
    );
    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    const outsideElement = screen.getByText("Outside");
    fireEvent.mouseDown(outsideElement);

    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  it("selects a single option", () => {
    render(
      <Dropdown
        dropdownOptions={mockDropdownOptions}
        isMultiSelect={false}
        label={"Option Label"}
      />,
    );
    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("selects and deselects all options in multi-select", () => {
    render(
      <Dropdown
        dropdownOptions={mockDropdownOptions}
        isMultiSelect={true}
        label={"Option Label"}
      />,
    );
    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    const selectAllCheckbox = screen.getByText("Select All");
    fireEvent.click(selectAllCheckbox);

    expect(
      screen.getByText("Option 1, Option 2, Option 3, Option 4"),
    ).toBeInTheDocument();

    const deselectAllCheckbox = screen.getByText("Deselect All");
    fireEvent.click(deselectAllCheckbox);
    expect(
      screen.queryByText("Option 1, Option 2, Option 3, Option 4"),
    ).not.toBeInTheDocument();
  });

  it("applies the correct classes for active and inactive label text states", () => {
    render(
      <Dropdown
        dropdownOptions={mockDropdownOptions}
        isMultiSelect={true}
        label={"Option Label"}
      />,
    );
    const label = screen.getByText("Option Label");
    const menuButton = screen.getByRole("button");

    expect(label).toHaveClass("dropdown-label");
    fireEvent.click(menuButton);
    expect(label).toHaveClass("dropdown-label-active");
  });
});
