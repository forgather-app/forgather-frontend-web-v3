import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initAnalytics } from "./utils/analytics";
import { getLegacyV2RedirectPath } from "./utils/getLegacyV2RedirectPath";
import { initSentry } from "./utils/sentry";

initSentry();
initAnalytics();

const legacyRedirectPath = getLegacyV2RedirectPath(
  window.location.pathname,
  window.location.search,
);

// v2 레거시 경로로 진입한 경우, v3 앱을 렌더링하지 않고 곧바로 대응되는 v3 경로로 이동한다.
if (legacyRedirectPath) {
  window.location.replace(legacyRedirectPath);
} else {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Root element not found");

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
