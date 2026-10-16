import * as Sentry from "@sentry/react";
import { isAppWebview } from "@/utils/isAppWebview";

/**
 * production 환경에서만 초기화한다(v2와 동일). dev에서는 개발 중 발생하는 노이즈가
 * 대시보드에 섞이지 않도록 아예 Sentry.init을 호출하지 않는다.
 */
export const initSentry = () => {
  if (import.meta.env.VITE_ENVIRONMENT !== "production") return;

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_ENVIRONMENT,
    sendDefaultPii: true,
  });

  Sentry.setTag(
    "view_context",
    isAppWebview(navigator.userAgent) ? "host_webview" : "guest_browser",
  );
};

/** 로그인 완료 시점에 호출해 이후 캡처되는 에러에 호스트를 식별자로 남긴다. */
export const identifySentryUser = (hostId: number) => {
  Sentry.setUser({ id: String(hostId) });
};

/** 로그아웃 시점에 호출해 이전 사용자 식별 정보가 남지 않도록 한다. */
export const clearSentryUser = () => {
  Sentry.setUser(null);
};
