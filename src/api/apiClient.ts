import axios from "axios";
import { notifyNativeLogout } from "@/utils/nativeBridge";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  // NOTE: 인증 토큰은 서버가 쿠키로 내려주므로, withCredentials로 요청마다 자동 전송됨
  withCredentials: true,
});

// NOTE: /auth/me는 로그인 여부를 확인하는 용도라 401이 정상 응답 중 하나이므로 제외.
// _authenticated 레이아웃이 /auth/me의 401을 자체적으로 처리해 /login으로 안내한다.
// /auth/refresh, /auth/logout 자체의 401은 재발급/로그아웃 재시도로 이어지면 순환이
// 생기므로 함께 제외한다.
const SESSION_CHECK_PATH = "/auth/me";
const REFRESH_PATH = "/auth/refresh";
const LOGOUT_PATH = "/auth/logout";
const AUTH_FLOW_PATHS = [SESSION_CHECK_PATH, REFRESH_PATH, LOGOUT_PATH];

let isHandlingSessionExpired = false;
// NOTE: 동시에 여러 요청이 401을 받아도 /auth/refresh는 한 번만 호출하도록
// 진행 중인 재발급 요청을 공유한다 (single-flight).
let refreshPromise: Promise<unknown> | null = null;

const forceLogoutAndRedirect = () => {
  if (isHandlingSessionExpired) return;
  isHandlingSessionExpired = true;
  // NOTE: stateless JWT라 서버가 발급된 토큰 자체를 무효화하지는 못하지만,
  // 쿠키는 만료시켜야 하므로 로그아웃 요청 후 로그인 페이지로 이동
  apiClient.post(LOGOUT_PATH).finally(() => {
    // NOTE: 앱 WebView는 Authorization 토큰을 주입하므로, 서버 로그아웃과 별개로
    // 앱에 토큰 폐기를 알려야 세션이 실제로 끊긴다 (docs/webview-logout-token-persistence.md)
    notifyNativeLogout();
    const redirectTo = `${window.location.pathname}${window.location.search}`;
    window.location.href = `/login?redirectTo=${encodeURIComponent(redirectTo)}`;
  });
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO: 서버 에러 응답 구조 확정 후 아래 항목 구현 필요
    // - 공통 에러 타입 정의 (e.g. { code: string; message: string })
    // - 403 Forbidden: 권한 없음 처리
    // - 비즈니스 에러 코드별 분기 처리
    // NOTE: 404는 공통 처리 대상에서 제외 — 리소스 없음은 각 페이지가 로컬로 분기 처리
    // (예: ArtworkDetailPage의 isNotFound 분기)하거나 라우트 notFound()로 다뤄야 할 케이스라,
    // 여기서 전역 에러 바운더리로 흘려보내지 않음

    const isUnauthorized = error.response?.status === 401;
    const requestUrl: string = error.config?.url ?? "";
    const isAuthFlowRequest = AUTH_FLOW_PATHS.some((path) =>
      requestUrl.startsWith(path),
    );
    // NOTE: 재발급 후 재시도한 요청이 또 401이 나는 경우(예: 서버가 재발급에
    // 실질적으로 실패했는데도 200을 준 경우) 재발급을 반복하지 않고 바로 로그아웃한다.
    const alreadyRetriedAfterRefresh = error.config?.__isRetryAfterRefresh;

    if (!isUnauthorized || isAuthFlowRequest || isHandlingSessionExpired) {
      return Promise.reject(error);
    }

    if (alreadyRetriedAfterRefresh) {
      forceLogoutAndRedirect();
      return Promise.reject(error);
    }

    try {
      refreshPromise ??= apiClient.post(REFRESH_PATH).finally(() => {
        refreshPromise = null;
      });
      await refreshPromise;
      return apiClient.request({
        ...error.config,
        __isRetryAfterRefresh: true,
      });
    } catch {
      forceLogoutAndRedirect();
      return Promise.reject(error);
    }
  },
);
