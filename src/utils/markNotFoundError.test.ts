import { isNotFound } from "@tanstack/react-router";
import { AxiosError, isAxiosError } from "axios";
import { describe, expect, it } from "vitest";
import { markNotFoundError } from "./markNotFoundError";

describe("markNotFoundError", () => {
  it("notFound 마커를 추가하면서 원본 AxiosError 객체를 그대로 유지한다", () => {
    const axiosError = new AxiosError(
      "Not Found",
      "404",
      undefined,
      undefined,
      { status: 404 } as AxiosError["response"],
    );

    const marked = markNotFoundError(axiosError);

    expect(marked).toBe(axiosError);
    expect(isNotFound(marked)).toBe(true);
    expect(isAxiosError(marked)).toBe(true);
    expect(marked.response?.status).toBe(404);
  });
});
