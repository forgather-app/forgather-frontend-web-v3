import { useCallback } from "react";
import { notifyNativeLogout } from "@/utils/nativeBridge";

/**
 * 로그아웃을 앱(RN WebView)에 알리는 브릿지 훅.
 *
 * 로그아웃 성공 시 `notifyLogout()`을 호출하면 앱이 주입한 인증 토큰을 폐기한다.
 * 앱이 아닌 일반 브라우저에서는 no-op이다.
 * (docs/webview-logout-token-persistence.md 참고)
 */
const useLogoutBridge = () => {
  const notifyLogout = useCallback(() => {
    notifyNativeLogout();
  }, []);

  return { notifyLogout };
};

export default useLogoutBridge;
