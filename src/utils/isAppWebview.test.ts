import { describe, expect, it } from "vitest";
import { isAppWebview } from "./isAppWebview";

describe("isAppWebview", () => {
  it("User-Agent에 ForgatherWebview가 포함되면 true를 반환한다", () => {
    expect(
      isAppWebview(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) ForgatherWebview/1.0",
      ),
    ).toBe(true);
  });

  it("User-Agent에 ForgatherWebview가 없으면 false를 반환한다", () => {
    expect(
      isAppWebview(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
      ),
    ).toBe(false);
  });

  it("빈 문자열이면 false를 반환한다", () => {
    expect(isAppWebview("")).toBe(false);
  });
});
