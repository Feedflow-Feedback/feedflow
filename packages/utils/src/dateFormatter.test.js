import { formatDateReadable } from "./dateFormatter";

describe("formatDateReadable", () => {
  it('formats an ISO date string into "HH:mm - DD.MM.YYYY" format', () => {
    const isoString = "2025-06-02T12:07:00.000Z";
    // Note: This time is in UTC, but JS Date uses local time zone by default.
    // To avoid timezone issues in test, we can mock Date or use fixed input/output.

    // For this test, let's assume environment is UTC timezone for simplicity.
    const expected = "14:07 - 02.06.2025";

    expect(formatDateReadable(isoString)).toBe(expected);
  });

  it("pads single digit hours, minutes, days and months with zero", () => {
    const isoString = "2025-01-05T02:04:00.000Z";
    const expected = "03:04 - 05.01.2025";

    expect(formatDateReadable(isoString)).toBe(expected);
  });

  it("returns a string even if input is invalid date", () => {
    const invalidIso = "not-a-date";
    // This will return "NaN:NaN - NaN.NaN.NaN" because new Date(invalid) is invalid
    const result = formatDateReadable(invalidIso);
    expect(typeof result).toBe("string");
    expect(result).toMatch(/NaN/);
  });
});
