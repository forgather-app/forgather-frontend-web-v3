// RN(WebView) 앱으로 보내는 Web → RN 브릿지 메시지.
// 앱이 아닌 환경(일반 브라우저)에서는 window.ReactNativeWebView가 없어 no-op이 된다.

interface LogoutBridgeMessage {
  type: "LOGOUT";
}

type NativeBridgeMessage = LogoutBridgeMessage;

const postToNative = (message: NativeBridgeMessage) => {
  window.ReactNativeWebView?.postMessage(JSON.stringify(message));
};

/**
 * 로그아웃을 앱에 알린다.
 *
 * 앱은 이 신호를 받아 주입한 인증 토큰(`window.__accessToken`)을 폐기해야 한다.
 * 앱 WebView는 모든 요청에 `Authorization: Bearer`를 주입하는데, stateless JWT라
 * 서버/쿠키 로그아웃만으로는 이 토큰이 살아있어 세션이 끊기지 않는다.
 * (docs/webview-logout-token-persistence.md 참고)
 */
export const notifyNativeLogout = () => {
  postToNative({ type: "LOGOUT" });
};
