import * as Sentry from "@sentry/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { clearSentryUser, identifySentryUser, initSentry } from "./sentry";

vi.mock("@sentry/react", () => ({
  init: vi.fn(),
  setTag: vi.fn(),
  setUser: vi.fn(),
}));

const setUserAgent = (userAgent: string) => {
  vi.stubGlobal("navigator", { userAgent });
};

describe("initSentry", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("production이 아니면 초기화하지 않는다", () => {
    vi.stubEnv("VITE_ENVIRONMENT", "development");

    initSentry();

    expect(Sentry.init).not.toHaveBeenCalled();
    expect(Sentry.setTag).not.toHaveBeenCalled();
  });

  it("production에서는 dsn/environment/sendDefaultPii로 초기화한다", () => {
    vi.stubEnv("VITE_ENVIRONMENT", "production");
    vi.stubEnv("VITE_SENTRY_DSN", "https://example.ingest.sentry.io/1");
    setUserAgent("Mozilla/5.0 AppleWebKit/605.1.15");

    initSentry();

    expect(Sentry.init).toHaveBeenCalledWith({
      dsn: "https://example.ingest.sentry.io/1",
      environment: "production",
      sendDefaultPii: true,
    });
  });

  it("앱 웹뷰 User-Agent면 view_context를 host_webview로 태깅한다", () => {
    vi.stubEnv("VITE_ENVIRONMENT", "production");
    setUserAgent("Mozilla/5.0 ForgatherWebview/1.0");

    initSentry();

    expect(Sentry.setTag).toHaveBeenCalledWith("view_context", "host_webview");
  });

  it("일반 브라우저 User-Agent면 view_context를 guest_browser로 태깅한다", () => {
    vi.stubEnv("VITE_ENVIRONMENT", "production");
    setUserAgent("Mozilla/5.0 AppleWebKit/605.1.15");

    initSentry();

    expect(Sentry.setTag).toHaveBeenCalledWith("view_context", "guest_browser");
  });
});

describe("identifySentryUser / clearSentryUser", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("hostId를 문자열로 변환해 Sentry 사용자로 설정한다", () => {
    identifySentryUser(42);

    expect(Sentry.setUser).toHaveBeenCalledWith({ id: "42" });
  });

  it("로그아웃 시 Sentry 사용자 정보를 지운다", () => {
    clearSentryUser();

    expect(Sentry.setUser).toHaveBeenCalledWith(null);
  });
});
