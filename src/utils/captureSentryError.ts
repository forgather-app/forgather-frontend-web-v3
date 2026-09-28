import * as Sentry from "@sentry/react";
import { isAxiosError } from "axios";

export type ApiErrorType =
  | "network_error"
  | "http_error"
  | "auth_retry_failed"
  | "token_refresh_failed";

interface ApiErrorBody {
  code?: string;
  message?: string;
}

/**
 * axios가 요청 body로 들고 있는 값을 Sentry extra에 안전하게 실을 수 있는 형태로 바꾼다.
 * FormData(이미지 업로드 등)는 그대로 직렬화되지 않으므로 File은 파일명만 남기고 나머지
 * 필드는 그대로 펼친다.
 */
const serializeRequestBody = (data: unknown): unknown => {
  if (typeof FormData !== "undefined" && data instanceof FormData) {
    return Object.fromEntries(
      Array.from(data.entries()).map(([key, value]) => [
        key,
        value instanceof File ? `[File: ${value.name}]` : value,
      ]),
    );
  }
  return data;
};

/**
 * apiClient 응답 인터셉터에서 발생하는 에러를 Sentry로 전송한다.
 * 4xx는 warning, 5xx/네트워크 에러는 error 레벨로 구분해 대시보드에서 심각도를 분리한다.
 * 요청 payload와 응답 body 전체를 그대로 담으므로, 방명록 콘텐츠 등 사용자 입력값이
 * Sentry 대시보드에 노출될 수 있다는 점을 감안해야 한다.
 */
export const captureSentryError = (error: unknown, errorType: ApiErrorType) => {
  if (!isAxiosError(error)) {
    Sentry.captureException(error, { tags: { errorType } });
    return;
  }

  const status = error.response?.status;
  const body = error.response?.data as ApiErrorBody | undefined;

  Sentry.captureException(error, {
    level: status !== undefined && status < 500 ? "warning" : "error",
    tags: {
      errorType,
      statusCode: status,
      code: body?.code,
    },
    extra: {
      url: error.config?.url,
      method: error.config?.method,
      requestBody: serializeRequestBody(error.config?.data),
      responseBody: error.response?.data,
    },
  });
};
