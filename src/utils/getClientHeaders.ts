import { APP_WEBVIEW_USER_AGENT } from "@/constants/appLinks";
import { isAppWebview } from "@/utils/isAppWebview";

const APP_VERSION_PATTERN = new RegExp(`${APP_WEBVIEW_USER_AGENT}/([\\d.]+)`);
// 앱 WebView의 userAgent는 `ForgatherWebview/{버전} (iOS|Android) WebView` 전체를
// 그대로 덮어쓰는 값이라(기본 브라우저 UA의 "iPhone"/"Android" 문구가 남지 않음),
// 일반 모바일 브라우저용 getMobileOS(iPhone/iPad/iPod 패턴)로는 iOS를 못 잡는다.
// 앱이 만드는 포맷에 맞춰 괄호 안 토큰을 직접 읽는다.
const APP_OS_PATTERN = /\((iOS|Android)\)/;

/**
 * 앱 WebView의 userAgent에서 클라이언트 타입(IOS|ANDROID)을 읽는다.
 * `isAppWebview(userAgent)`가 true인 경우에만 호출한다 — 앱 스토어 링크 분기
 * (`UpdateRequiredModal`)에서도 같은 기준을 써야 하므로 별도로 export한다.
 */
export const getAppClientType = (userAgent: string): "IOS" | "ANDROID" => {
  const os = userAgent.match(APP_OS_PATTERN)?.[1];
  return os === "Android" ? "ANDROID" : "IOS";
};

/**
 * 앱 WebView의 userAgent에서 네이티브 빌드 버전을 읽는다.
 * 마이페이지의 "앱 버전" 표시에도 같은 기준을 써야 하므로 별도로 export한다.
 */
export const getAppVersion = (userAgent: string): string | undefined =>
  userAgent.match(APP_VERSION_PATTERN)?.[1];

/**
 * User-Agent로부터 서버에 보낼 X-Client-Type / X-App-Version 헤더를 만든다.
 *
 * 앱(iOS/Android)은 WebView의 userAgent에 `ForgatherWebview/{네이티브 빌드 버전}
 * (iOS|Android)`를 싣고 있으므로, 별도 네이티브 브릿지 없이 UA 파싱만으로 클라이언트
 * 타입과 앱 버전을 알 수 있다.
 */
export const getClientHeaders = (userAgent: string): Record<string, string> => {
  if (!isAppWebview(userAgent)) {
    return { "X-Client-Type": "WEB" };
  }

  const headers: Record<string, string> = {
    "X-Client-Type": getAppClientType(userAgent),
  };

  const appVersion = getAppVersion(userAgent);
  if (appVersion) {
    headers["X-App-Version"] = appVersion;
  }

  return headers;
};
