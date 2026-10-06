import posthog from "posthog-js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("posthog-js", () => ({
  default: {
    init: vi.fn(),
    register: vi.fn(),
    capture: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
  },
}));

const setUserAgent = (userAgent: string) => {
  vi.stubGlobal("navigator", { userAgent });
};

describe("analytics", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    setUserAgent("Mozilla/5.0 AppleWebKit/605.1.15");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("production이 아니면 posthog.init을 호출하지 않는다", async () => {
    vi.stubEnv("VITE_ENVIRONMENT", "development");
    const { initAnalytics } = await import("./analytics");

    initAnalytics();

    expect(posthog.init).not.toHaveBeenCalled();
  });

  it("production에서는 key/host로 초기화하고 pageview 자동 캡처를 끈다", async () => {
    vi.stubEnv("VITE_ENVIRONMENT", "production");
    vi.stubEnv("VITE_POSTHOG_KEY", "phc_test");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://us.i.posthog.com");
    const { initAnalytics } = await import("./analytics");

    initAnalytics();

    expect(posthog.init).toHaveBeenCalledWith("phc_test", {
      api_host: "https://us.i.posthog.com",
      capture_pageview: false,
    });
  });

  it("앱 웹뷰 User-Agent면 view_context를 host_webview로 등록한다", async () => {
    vi.stubEnv("VITE_ENVIRONMENT", "production");
    setUserAgent("Mozilla/5.0 ForgatherWebview/1.0");
    const { initAnalytics } = await import("./analytics");

    initAnalytics();

    expect(posthog.register).toHaveBeenCalledWith({
      view_context: "host_webview",
    });
  });

  it("일반 브라우저 User-Agent면 view_context를 guest_browser로 등록한다", async () => {
    vi.stubEnv("VITE_ENVIRONMENT", "production");
    const { initAnalytics } = await import("./analytics");

    initAnalytics();

    expect(posthog.register).toHaveBeenCalledWith({
      view_context: "guest_browser",
    });
  });

  it("초기화 전에는 pageview/identify/reset이 posthog로 위임되지 않는다", async () => {
    vi.stubEnv("VITE_ENVIRONMENT", "development");
    const {
      initAnalytics,
      capturePageview,
      identifyAnalyticsUser,
      resetAnalyticsUser,
    } = await import("./analytics");
    initAnalytics();

    capturePageview("/home");
    identifyAnalyticsUser(1);
    resetAnalyticsUser();

    expect(posthog.capture).not.toHaveBeenCalled();
    expect(posthog.identify).not.toHaveBeenCalled();
    expect(posthog.reset).not.toHaveBeenCalled();
  });

  it("초기화 후에는 pageview/identify/reset이 posthog로 위임된다", async () => {
    vi.stubEnv("VITE_ENVIRONMENT", "production");
    vi.stubEnv("VITE_POSTHOG_KEY", "phc_test");
    vi.stubEnv("VITE_POSTHOG_HOST", "https://us.i.posthog.com");
    const {
      initAnalytics,
      capturePageview,
      identifyAnalyticsUser,
      resetAnalyticsUser,
    } = await import("./analytics");
    initAnalytics();

    capturePageview("/spaces/1");
    identifyAnalyticsUser(7);
    resetAnalyticsUser();

    expect(posthog.capture).toHaveBeenCalledWith("$pageview", {
      $current_url: "/spaces/1",
    });
    expect(posthog.identify).toHaveBeenCalledWith("7");
    expect(posthog.reset).toHaveBeenCalled();
  });
});
