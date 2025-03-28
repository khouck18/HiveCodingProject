import { getTruncatedSelectedValues } from "./dropdownHelpers";

describe("getTruncatedSelectedValues", () => {
  it("should return the full string if the string length is less than maxLength of characters", () => {
    const result = getTruncatedSelectedValues("A short string.", 20);
    expect(result).toBe("A short string.");
  });
  it("should truncate a string that is longer than the maxLength", () => {
    const result = getTruncatedSelectedValues(
      "A very long string that is more than 20 characters",
      20,
    );
    expect(result).toBe("A very long strin...");
  });
  it("should join a array of strings and return the full string that is shorter than the maxLength", () => {
    const result = getTruncatedSelectedValues(["Option1", "Option2"], 20);
    expect(result).toBe("Option1, Option2");
  });
  it("should join a array of strings and return a truncated string since it is longer than the maxLength", () => {
    const result = getTruncatedSelectedValues(
      ["Option1", "Option2", "Option3"],
      20,
    );
    expect(result).toBe("Option1, Option2,...");
  });
  it("should handle and empty string input", () => {
    const result = getTruncatedSelectedValues("", 20);
    expect(result).toBe("");
  });
  it("should handle and empty array input", () => {
    const result = getTruncatedSelectedValues([], 20);
    expect(result).toBe("");
  });
  it("should handle a long string and truncate it without passing a maxLength param", () => {
    const result = getTruncatedSelectedValues(
      "A very long string that should be truncated at 50 characters",
    );
    expect(result).toBe("A very long string that should be truncated at ...");
  });
});
