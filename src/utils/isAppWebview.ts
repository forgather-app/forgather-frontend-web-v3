import { APP_WEBVIEW_USER_AGENT } from "@/constants/appLinks";

export const isAppWebview = (userAgent: string): boolean =>
  userAgent.includes(APP_WEBVIEW_USER_AGENT);
