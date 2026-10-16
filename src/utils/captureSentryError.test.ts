import * as Sentry from "@sentry/react";
import { AxiosError } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { captureSentryError } from "./captureSentryError";

vi.mock("@sentry/react", () => ({
  captureException: vi.fn(),
}));

const createAxiosError = (
  status: number | undefined,
  data?: { code?: string; message?: string },
  requestBody?: unknown,
) =>
  new AxiosError(
    "Request failed",
    String(status),
    {
      url: "/spaces",
      method: "get",
      data: requestBody,
    } as AxiosError["config"],
    undefined,
    status === undefined
      ? undefined
      : ({ status, data } as AxiosError["response"]),
  );

describe("captureSentryError", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("axios 에러가 아니면 errorType 태그만 붙여 그대로 캡처한다", () => {
    const error = new Error("boom");

    captureSentryError(error, "network_error");

    expect(Sentry.captureException).toHaveBeenCalledWith(error, {
      tags: { errorType: "network_error" },
    });
  });

  it("4xx 응답은 warning 레벨로 캡처하고 code/statusCode를 태그로, 요청/응답 body를 extra로 남긴다", () => {
    const responseBody = {
      code: "VALIDATION_FAILED",
      message: "공백일 수 없습니다",
    };
    const error = createAxiosError(400, responseBody, { name: "" });

    captureSentryError(error, "http_error");

    expect(Sentry.captureException).toHaveBeenCalledWith(error, {
      level: "warning",
      tags: {
        errorType: "http_error",
        statusCode: 400,
        code: "VALIDATION_FAILED",
      },
      extra: {
        url: "/spaces",
        method: "get",
        requestBody: { name: "" },
        responseBody,
      },
    });
  });

  it("요청 body가 FormData면 File은 파일명으로, 나머지 필드는 그대로 직렬화한다", () => {
    const formData = new FormData();
    formData.append("title", "내 방명록");
    formData.append(
      "image",
      new File(["binary"], "photo.png", { type: "image/png" }),
    );
    const error = createAxiosError(400, { code: "BAD_REQUEST" }, formData);

    captureSentryError(error, "http_error");

    expect(Sentry.captureException).toHaveBeenCalledWith(
      error,
      expect.objectContaining({
        extra: expect.objectContaining({
          requestBody: {
            title: "내 방명록",
            image: "[File: photo.png]",
          },
        }),
      }),
    );
  });

  it("5xx 응답은 error 레벨로 캡처한다", () => {
    const error = createAxiosError(500, { code: "INTERNAL_ERROR" });

    captureSentryError(error, "http_error");

    expect(Sentry.captureException).toHaveBeenCalledWith(
      error,
      expect.objectContaining({ level: "error" }),
    );
  });

  it("응답 자체가 없는 네트워크 에러는 error 레벨로 캡처한다", () => {
    const error = createAxiosError(undefined);

    captureSentryError(error, "network_error");

    expect(Sentry.captureException).toHaveBeenCalledWith(
      error,
      expect.objectContaining({
        level: "error",
        tags: expect.objectContaining({ statusCode: undefined }),
      }),
    );
  });
});
