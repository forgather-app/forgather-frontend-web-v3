import { describe, expect, it } from "vitest";
import {
  isWithinGuestBookWritingPeriod,
  validateGuestBookWritingPeriod,
} from "./guestBookWritingPolicy";

describe("guestbook writing policy", () => {
  it("requires both dates only for exhibition policy", () => {
    expect(
      validateGuestBookWritingPeriod("ALWAYS", {
        startDate: null,
        endDate: null,
      }),
    ).toBe(true);
    expect(
      validateGuestBookWritingPeriod("EXHIBITION_PERIOD", {
        startDate: new Date(),
        endDate: null,
      }),
    ).toBe("전시 기간에만 작성하도록 설정하려면 전시 기간을 입력해주세요.");
    expect(
      validateGuestBookWritingPeriod("EXHIBITION_PERIOD", {
        startDate: new Date(2026, 9, 20),
        endDate: new Date(2026, 9, 22),
      }),
    ).toBe(true);
  });
  it.each([
    ["2026-10-19T14:59:59.999Z", false],
    ["2026-10-19T15:00:00.000Z", true],
    ["2026-10-22T14:59:59.999Z", true],
    ["2026-10-22T15:00:00.000Z", false],
  ])("uses inclusive Korea dates at %s", (now, expected) => {
    expect(
      isWithinGuestBookWritingPeriod(
        {
          guestBookWritingPolicy: "EXHIBITION_PERIOD",
          exhibitionStartDate: "2026-10-20",
          exhibitionEndDate: "2026-10-22",
        },
        new Date(now).getTime(),
      ),
    ).toBe(expected);
  });
  it("allows legacy and always spaces, fails closed for incomplete restricted dates", () => {
    expect(isWithinGuestBookWritingPeriod({}, 0)).toBe(true);
    expect(
      isWithinGuestBookWritingPeriod({ guestBookWritingPolicy: "ALWAYS" }, 0),
    ).toBe(true);
    expect(
      isWithinGuestBookWritingPeriod(
        { guestBookWritingPolicy: "EXHIBITION_PERIOD" },
        0,
      ),
    ).toBe(false);
  });
});
