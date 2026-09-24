import posthog from "posthog-js";
import { isAppWebview } from "@/utils/isAppWebview";

let isAnalyticsEnabled = false;

/**
 * production 환경에서만 초기화한다(v2와 동일). dev에서 발생하는 클릭/이벤트가
 * 실제 대시보드 데이터에 섞이지 않도록 아예 posthog.init을 호출하지 않는다.
 */
export const initAnalytics = () => {
  if (import.meta.env.VITE_ENVIRONMENT !== "production") return;

  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    // TanStack Router는 SPA 라우팅이라 페이지 이동 시 전체 새로고침이 없어
    // 자동 캡처 대신 라우터 쪽에서 수동으로 $pageview를 캡처한다.
    capture_pageview: false,
  });

  posthog.register({
    view_context: isAppWebview(navigator.userAgent)
      ? "host_webview"
      : "guest_browser",
  });

  isAnalyticsEnabled = true;
};

export const capturePageview = (pathname: string) => {
  if (!isAnalyticsEnabled) return;
  posthog.capture("$pageview", { $current_url: pathname });
};

/** 로그인 완료 시점에 호출해 이후 이벤트를 호스트 계정에 귀속시킨다. */
export const identifyAnalyticsUser = (hostId: number) => {
  if (!isAnalyticsEnabled) return;
  posthog.identify(String(hostId));
};

/** 로그아웃 시점에 호출해 다음 사용자의 이벤트가 이전 세션과 섞이지 않게 한다. */
export const resetAnalyticsUser = () => {
  if (!isAnalyticsEnabled) return;
  posthog.reset();
};

/**
 * 이름이 있는 커스텀 이벤트를 전송한다.
 * autocapture($autocapture)는 클릭 등 상호작용을 자동으로 잡아주지만 "어떤 DOM 요소를
 * 눌렀는지"만 알 뿐 비즈니스 의미는 모른다. 방명록 작성 완료, 전시 생성, 공유 링크 복사처럼
 * 대시보드에서 퍼널/지표로 보고 싶은 액션은 이 함수로 명시적인 이벤트 이름을 붙여 전송한다.
 * 이벤트 이름/속성 스펙은 기획·PM과 합의 후 정하고, 컴포넌트에서 posthog.capture()를 직접
 * 호출하지 말고 이 함수를 통해서만 호출한다.
 */
export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>,
) => {
  if (!isAnalyticsEnabled) return;
  posthog.capture(eventName, properties);
};
