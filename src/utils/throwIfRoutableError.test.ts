import { isNotFound } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { describe, expect, it } from "vitest";
import { throwIfRoutableError } from "./throwIfRoutableError";

const createAxiosError = (status: number) =>
  new AxiosError("error", String(status), undefined, undefined, {
    status,
  } as AxiosError["response"]);

describe("throwIfRoutableError", () => {
  it("모든 에러가 없으면(undefined) 아무것도 던지지 않는다", () => {
    expect(() => throwIfRoutableError(undefined, undefined)).not.toThrow();
  });

  it("notFound 마커가 있는 에러가 있으면 notFound()를 던진다", () => {
    const notFoundError = { isNotFound: true };

    try {
      throwIfRoutableError(createAxiosError(500), notFoundError);
      expect.unreachable("should have thrown");
    } catch (thrown) {
      expect(isNotFound(thrown)).toBe(true);
    }
  });

  it("notFound가 없고 5xx 에러가 있으면 그 에러를 그대로 던진다", () => {
    const serverError = createAxiosError(500);

    expect(() => throwIfRoutableError(undefined, serverError)).toThrow(
      serverError,
    );
  });

  it("notFound도 5xx도 아닌 에러(네트워크, 403 등)도 그대로 던진다", () => {
    const otherError = createAxiosError(403);

    expect(() => throwIfRoutableError(otherError)).toThrow(otherError);
  });
});
