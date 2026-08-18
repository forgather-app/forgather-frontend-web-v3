import { APP_STORE_URL, PLAY_STORE_URL } from "@/constants/appLinks";
import { getMobileOS } from "@/utils/getMobileOS";
import { isAppWebview } from "@/utils/isAppWebview";

// TODO(#155): OS 판별 실패(데스크톱 등)로 스토어를 특정할 수 없는 경우
// iOS/Android 스토어 링크를 모두 노출하는 fallback 안내 페이지로 교체한다.
export const appOnlyBeforeLoad = () => {
  if (isAppWebview(navigator.userAgent)) return;

  const os = getMobileOS(navigator.userAgent);
  const storeUrl = os === "ios" ? APP_STORE_URL : PLAY_STORE_URL;

  if (storeUrl) {
    window.location.href = storeUrl;
  }
};
