import { isNotFound } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { throwIfNotFound } from "./throwIfNotFound";

describe("throwIfNotFound", () => {
  it("모든 에러가 없으면(undefined) 아무것도 던지지 않는다", () => {
    expect(() => throwIfNotFound(undefined, undefined)).not.toThrow();
  });

  it("notFound가 아닌 에러만 있으면 아무것도 던지지 않는다", () => {
    expect(() => throwIfNotFound(new Error("network error"))).not.toThrow();
  });

  it("전달된 에러 중 하나라도 notFound면 notFound()를 던진다", () => {
    const notFoundError = { isNotFound: true };

    try {
      throwIfNotFound(new Error("other error"), notFoundError);
      expect.unreachable("should have thrown");
    } catch (thrown) {
      expect(isNotFound(thrown)).toBe(true);
    }
  });
});
