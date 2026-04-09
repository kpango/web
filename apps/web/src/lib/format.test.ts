import { describe, expect, it } from "vitest";
import { formatDate, formatDisplayDate } from "./format";

describe("formatDate", () => {
  it("returns 'Present' for null input", () => {
    expect(formatDate(null)).toBe("Present");
  });

  it("formats ISO date to 'Mon Year'", () => {
    expect(formatDate("2024-03")).toBe("Mar 2024");
    expect(formatDate("2019-08")).toBe("Aug 2019");
    expect(formatDate("2016-01")).toBe("Jan 2016");
    expect(formatDate("2023-12")).toBe("Dec 2023");
  });
});

describe("formatDisplayDate", () => {
  it("formats ISO date to long English format", () => {
    const result = formatDisplayDate("2024-03-30");
    expect(result).toContain("2024");
    expect(result).toContain("March");
    expect(result).toContain("30");
  });
});
