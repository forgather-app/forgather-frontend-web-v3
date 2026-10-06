import { describe, expect, it } from "vitest";
import { isGuestFlow } from "./isGuestFlow";

describe("isGuestFlow", () => {
  it("_appOnly로 시작하는 라우트가 없으면 게스트 flow로 판단한다", () => {
    expect(
      isGuestFlow([
        { routeId: "__root__" },
        { routeId: "/spaces/$spaceId/guest" },
        { routeId: "/spaces/$spaceId/guest/" },
      ]),
    ).toBe(true);
  });

  it("_appOnly로 시작하는 라우트가 있으면 게스트 flow가 아니다", () => {
    expect(
      isGuestFlow([
        { routeId: "__root__" },
        { routeId: "/_appOnly" },
        { routeId: "/_appOnly/_authenticated" },
        { routeId: "/_appOnly/_authenticated/spaces/$spaceId" },
      ]),
    ).toBe(false);
  });

  it("매치가 없으면(빈 배열) 게스트 flow로 취급한다", () => {
    expect(isGuestFlow([])).toBe(true);
  });
});
