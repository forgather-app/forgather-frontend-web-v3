import { describe, expect, it } from "vitest";
import { getMobileOS } from "./getMobileOS";

describe("getMobileOS", () => {
  it("iPhone User-Agent는 ios를 반환한다", () => {
    expect(
      getMobileOS("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)"),
    ).toBe("ios");
  });

  it("iPad User-Agent는 ios를 반환한다", () => {
    expect(getMobileOS("Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)")).toBe(
      "ios",
    );
  });

  it("Android User-Agent는 android를 반환한다", () => {
    expect(getMobileOS("Mozilla/5.0 (Linux; Android 14; Pixel 8)")).toBe(
      "android",
    );
  });

  it("데스크톱 등 판별 불가한 User-Agent는 unknown을 반환한다", () => {
    expect(getMobileOS("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)")).toBe(
      "unknown",
    );
  });

  it("빈 문자열이면 unknown을 반환한다", () => {
    expect(getMobileOS("")).toBe("unknown");
  });
});
