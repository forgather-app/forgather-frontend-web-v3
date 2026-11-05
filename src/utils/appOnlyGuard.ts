import { APP_STORE_URL, PLAY_STORE_URL } from "@/constants/appLinks";
import { getMobileOS } from "@/utils/getMobileOS";
import { isAppWebview } from "@/utils/isAppWebview";

export const appOnlyBeforeLoad = () => {
  if (isAppWebview(navigator.userAgent)) return;

  const os = getMobileOS(navigator.userAgent);
  if (os === "unknown") return;

  const storeUrl = os === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
  if (storeUrl) {
    window.location.href = storeUrl;
  }
};
